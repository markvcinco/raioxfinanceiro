import { NextRequest, NextResponse } from "next/server";
import { asaasWebhookEventSchema } from "@/lib/asaas/types";
import {
  buscarPagamentoPorAsaasId,
  confirmarPagamento,
} from "@/lib/supabase/queries";

function validarWebhookToken(request: NextRequest): boolean {
  const secret = process.env.ASAAS_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[webhook] ASAAS_WEBHOOK_SECRET não configurado — aceitando em dev");
    return process.env.NODE_ENV === "development";
  }

  const token = request.headers.get("asaas-access-token");
  if (!token) {
    console.warn("[webhook] Header asaas-access-token ausente");
    return false;
  }

  return token === secret;
}

export async function POST(request: NextRequest) {
  // 1. Validate webhook authenticity
  if (!validarWebhookToken(request)) {
    console.error("[webhook] Token inválido — rejeitando");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[webhook] Corpo inválido (não é JSON)");
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // 3. Validate with Zod
  const parsed = asaasWebhookEventSchema.safeParse(body);
  if (!parsed.success) {
    console.error("[webhook] Payload inválido:", parsed.error.message);
    // Return 200 to prevent Asaas from retrying
    return NextResponse.json({ received: true, valid: false });
  }

  const evento = parsed.data;
  console.log(`[webhook] Evento recebido: ${evento.event} — payment ${evento.payment.id}`);

  // 4. Handle payment confirmation events
  if (evento.event === "PAYMENT_CONFIRMED" || evento.event === "PAYMENT_RECEIVED") {
    try {
      // Check if we have this payment
      const pagamento = await buscarPagamentoPorAsaasId(evento.payment.id);
      if (!pagamento) {
        console.warn(`[webhook] Pagamento ${evento.payment.id} não encontrado no banco`);
        return NextResponse.json({ received: true });
      }

      if (pagamento.status === "confirmado") {
        console.log(`[webhook] Pagamento ${evento.payment.id} já confirmado — ignorando`);
        return NextResponse.json({ received: true });
      }

      // Confirm payment and update diagnostico
      await confirmarPagamento(evento.payment.id, body);

      console.log(
        `[webhook] Pagamento ${evento.payment.id} confirmado — diagnóstico ${pagamento.diagnostico_id} atualizado para 'pago'`
      );

      // TODO: Dispatch PDF generation (next prompt)
      console.log("Pagamento confirmado — acionar geração de PDF");
    } catch (err) {
      console.error(`[webhook] Erro ao processar pagamento:`, err);
      // Return 200 anyway to prevent Asaas from retrying endlessly
      // The error is logged for manual investigation
      return NextResponse.json({ received: true, error: "processing_error" });
    }
  } else if (evento.event === "PAYMENT_OVERDUE") {
    console.log(`[webhook] Pagamento ${evento.payment.id} vencido`);
    // Could update status to 'vencido' if needed
  } else {
    console.log(`[webhook] Evento ${evento.event} não requer ação`);
  }

  // 5. Always return 200 (Asaas retries on non-200)
  return NextResponse.json({ received: true });
}
