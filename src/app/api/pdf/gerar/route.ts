import { NextRequest, NextResponse } from "next/server";
import {
  buscarDiagnosticoPorId,
  marcarRelatorioEnviado,
} from "@/lib/supabase/queries";
import { uploadPdf, gerarUrlAssinada } from "@/lib/supabase/storage";
import { enviarRelatorioPorEmail } from "@/lib/email/enviar-relatorio";

const INTERNAL_TOKEN = process.env.PDF_INTERNAL_TOKEN ?? "dev-token-raioxfinanceiro";

function validarToken(request: NextRequest): boolean {
  const token = request.headers.get("x-internal-token");
  if (process.env.NODE_ENV === "development" && !token) return true;
  return token === INTERNAL_TOKEN;
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function POST(request: NextRequest) {
  // 1. Auth
  if (!validarToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse body
  let diagnosticoId: string;
  try {
    const body = await request.json();
    diagnosticoId = body.diagnosticoId;
    if (!diagnosticoId) throw new Error("Missing diagnosticoId");
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // 3. Validate diagnostico
  const diagnostico = await buscarDiagnosticoPorId(diagnosticoId);
  if (!diagnostico) {
    return NextResponse.json({ error: "Diagnostico not found" }, { status: 404 });
  }

  if (diagnostico.status !== "pago" && diagnostico.status !== "relatorio_enviado") {
    return NextResponse.json(
      { error: `Diagnostico status is '${diagnostico.status}', expected 'pago'` },
      { status: 400 }
    );
  }

  // If already generated, just return the signed URL
  if (diagnostico.status === "relatorio_enviado") {
    try {
      const url = await gerarUrlAssinada(diagnosticoId);
      return NextResponse.json({ url, cached: true });
    } catch {
      // PDF might not exist in storage, regenerate
    }
  }

  // 4. Launch Chromium and generate PDF
  let pdfBuffer: Buffer;
  try {
    const chromium = await import("@sparticuz/chromium");
    const { chromium: playwright } = await import("playwright-core");

    const browser = await playwright.launch({
      args: chromium.default.args,
      executablePath:
        process.env.CHROMIUM_PATH ?? (await chromium.default.executablePath()),
      headless: true,
    });

    const page = await browser.newPage();

    const templateUrl = `${getBaseUrl()}/api/pdf/template/${diagnosticoId}`;
    console.log(`[pdf] Navigating to ${templateUrl}`);

    await page.goto(templateUrl, { waitUntil: "networkidle", timeout: 30_000 });

    pdfBuffer = Buffer.from(
      await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      })
    );

    await browser.close();
    console.log(`[pdf] PDF generated: ${pdfBuffer.length} bytes`);
  } catch (err) {
    console.error("[pdf] Chromium error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF", detail: String(err) },
      { status: 500 }
    );
  }

  // 5. Upload to Supabase Storage
  try {
    await uploadPdf(diagnosticoId, pdfBuffer);
    console.log(`[pdf] Uploaded to storage: relatorios/${diagnosticoId}.pdf`);
  } catch (err) {
    console.error("[pdf] Storage upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload PDF", detail: String(err) },
      { status: 500 }
    );
  }

  // 6. Mark diagnostico as relatorio_enviado
  try {
    await marcarRelatorioEnviado(diagnosticoId);
    console.log(`[pdf] Diagnostico ${diagnosticoId} marked as relatorio_enviado`);
  } catch (err) {
    console.error("[pdf] Status update error:", err);
  }

  // 7. Send email (async, don't block response)
  enviarRelatorioPorEmail(diagnosticoId, diagnostico.email).catch((err) => {
    console.error("[pdf] Email send error:", err);
  });

  // 8. Return signed URL
  try {
    const url = await gerarUrlAssinada(diagnosticoId);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ ok: true, message: "PDF generated, URL generation failed" });
  }
}
