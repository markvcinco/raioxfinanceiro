/**
 * Script de teste para gerar PDF de um diagnóstico.
 *
 * Uso:
 *   pnpm tsx scripts/gerar-pdf-teste.ts <diagnostico_id>
 *
 * Requer que o servidor Next.js esteja rodando (pnpm dev).
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const TOKEN = process.env.PDF_INTERNAL_TOKEN ?? "dev-token-raioxfinanceiro";

async function main() {
  const diagnosticoId = process.argv[2];

  if (!diagnosticoId) {
    console.error("Uso: pnpm tsx scripts/gerar-pdf-teste.ts <diagnostico_id>");
    process.exit(1);
  }

  console.log(`[teste] Gerando PDF para diagnóstico: ${diagnosticoId}`);
  console.log(`[teste] URL base: ${BASE_URL}`);

  // 1. Check template renders
  console.log("\n--- Verificando template HTML ---");
  const templateRes = await fetch(
    `${BASE_URL}/api/pdf/template/${diagnosticoId}`
  );
  if (!templateRes.ok) {
    console.error(
      `[teste] Template retornou ${templateRes.status}: ${await templateRes.text()}`
    );
    process.exit(1);
  }
  const html = await templateRes.text();
  console.log(`[teste] Template OK — ${html.length} caracteres`);

  // 2. Trigger PDF generation
  console.log("\n--- Disparando geração do PDF ---");
  const pdfRes = await fetch(`${BASE_URL}/api/pdf/gerar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-token": TOKEN,
    },
    body: JSON.stringify({ diagnosticoId }),
  });

  const pdfBody = await pdfRes.json();

  if (!pdfRes.ok) {
    console.error(`[teste] Geração falhou (${pdfRes.status}):`, pdfBody);
    process.exit(1);
  }

  console.log(`[teste] PDF gerado com sucesso!`);

  if (pdfBody.url) {
    console.log(`[teste] URL assinada: ${pdfBody.url}`);
  }
  if (pdfBody.cached) {
    console.log(`[teste] (resultado cacheado — PDF já existia)`);
  }
}

main().catch((err) => {
  console.error("[teste] Erro inesperado:", err);
  process.exit(1);
});
