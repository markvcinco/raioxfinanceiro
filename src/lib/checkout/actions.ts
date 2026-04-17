"use server";

import { redirect } from "next/navigation";
import { checkoutSchema, cartaoSchema } from "./schemas";
import { createAsaasClient } from "@/lib/asaas/client";
import {
  buscarDiagnosticoPorId,
  buscarPagamentoPorDiagnosticoId,
  criarPagamento,
} from "@/lib/supabase/queries";

const VALOR_RELATORIO = 29.9;

function limparCpfCnpj(valor: string): string {
  return valor.replace(/\D/g, "");
}

function formatarDataVencimento(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1); // vencimento amanhã
  return d.toISOString().split("T")[0];
}

export type CheckoutFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function iniciarCheckoutAction(
  _prev: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const raw = {
    diagnostico_id: formData.get("diagnostico_id"),
    cpf_cnpj: formData.get("cpf_cnpj"),
    metodo: formData.get("metodo"),
  };

  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { diagnostico_id, cpf_cnpj, metodo } = parsed.data;

  // 1. Validate diagnostico exists and is concluido
  const diagnostico = await buscarDiagnosticoPorId(diagnostico_id);
  if (!diagnostico) {
    return { message: "Diagnóstico não encontrado." };
  }
  if (diagnostico.status !== "concluido") {
    if (diagnostico.status === "pago" || diagnostico.status === "relatorio_enviado") {
      redirect(`/relatorio/${diagnostico_id}`);
    }
    return { message: "Diagnóstico ainda não foi concluído." };
  }

  // 2. Check if there's already a pending payment
  const pagamentoExistente = await buscarPagamentoPorDiagnosticoId(diagnostico_id);
  if (pagamentoExistente && pagamentoExistente.status === "confirmado") {
    redirect(`/relatorio/${diagnostico_id}`);
  }

  // 3. Create or find Asaas customer
  const asaas = createAsaasClient();
  const cpfCnpjLimpo = limparCpfCnpj(cpf_cnpj);

  let asaasCustomerId: string;
  try {
    const existing = await asaas.buscarClientePorCpfCnpj(cpfCnpjLimpo);
    if (existing) {
      asaasCustomerId = existing.id;
    } else {
      const novo = await asaas.criarCliente({
        name: diagnostico.nome_responsavel,
        email: diagnostico.email,
        phone: diagnostico.telefone ?? undefined,
        cpfCnpj: cpfCnpjLimpo,
        company: diagnostico.nome_empresa,
        externalReference: diagnostico_id,
      });
      asaasCustomerId = novo.id;
    }
  } catch {
    return { message: "Erro ao processar dados do cliente. Verifique o CPF/CNPJ." };
  }

  // 4. Create payment in Asaas
  const billingType = metodo as "PIX" | "CREDIT_CARD";
  let asaasPayment;
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    asaasPayment = await asaas.criarCobranca({
      customer: asaasCustomerId,
      billingType,
      value: VALOR_RELATORIO,
      dueDate: formatarDataVencimento(),
      description: "Raio-X Financeiro MARK V — Relatório Completo",
      externalReference: diagnostico_id,
      callbackSuccessUrl: `${appUrl}/relatorio/${diagnostico_id}`,
    });
  } catch {
    return { message: "Erro ao criar cobrança. Tente novamente." };
  }

  // 5. Save payment record in our DB
  const metodoDB = billingType === "PIX" ? "pix" : "credit_card";
  await criarPagamento({
    diagnostico_id,
    asaas_payment_id: asaasPayment.id,
    asaas_customer_id: asaasCustomerId,
    valor: VALOR_RELATORIO,
    metodo: metodoDB,
  });

  // 6. Redirect based on payment method
  if (billingType === "PIX") {
    redirect(`/checkout/${diagnostico_id}/pix?payment=${asaasPayment.id}`);
  } else {
    redirect(asaasPayment.invoiceUrl);
  }
}

export async function pagarComCartaoAction(
  _prev: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const raw = {
    diagnostico_id: formData.get("diagnostico_id"),
    cpf_cnpj: formData.get("cpf_cnpj"),
    nome_titular: formData.get("nome_titular"),
    numero_cartao: formData.get("numero_cartao"),
    mes_validade: formData.get("mes_validade"),
    ano_validade: formData.get("ano_validade"),
    cvv: formData.get("cvv"),
    cep: formData.get("cep"),
    numero_endereco: formData.get("numero_endereco"),
  };

  const parsed = cartaoSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { diagnostico_id, cpf_cnpj, nome_titular, numero_cartao, mes_validade, ano_validade, cvv, cep, numero_endereco } = parsed.data;

  const diagnostico = await buscarDiagnosticoPorId(diagnostico_id);
  if (!diagnostico) return { message: "Diagnóstico não encontrado." };
  if (diagnostico.status === "pago" || diagnostico.status === "relatorio_enviado") {
    redirect(`/relatorio/${diagnostico_id}`);
  }
  if (diagnostico.status !== "concluido") {
    return { message: "Diagnóstico ainda não foi concluído." };
  }

  const asaas = createAsaasClient();
  const cpfCnpjLimpo = limparCpfCnpj(cpf_cnpj);
  const cepLimpo = cep.replace(/\D/g, "");
  const numeroCartaoLimpo = numero_cartao.replace(/\s/g, "");

  let asaasCustomerId: string;
  try {
    const existing = await asaas.buscarClientePorCpfCnpj(cpfCnpjLimpo);
    if (existing) {
      asaasCustomerId = existing.id;
    } else {
      const novo = await asaas.criarCliente({
        name: diagnostico.nome_responsavel,
        email: diagnostico.email,
        phone: diagnostico.telefone ?? undefined,
        cpfCnpj: cpfCnpjLimpo,
        company: diagnostico.nome_empresa,
        externalReference: diagnostico_id,
      });
      asaasCustomerId = novo.id;
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[checkout] Asaas customer error:", detail);
    return { message: `Erro no cliente Asaas: ${detail}` };
  }

  let asaasPayment;
  try {
    asaasPayment = await asaas.criarCobranca({
      customer: asaasCustomerId,
      billingType: "CREDIT_CARD",
      value: VALOR_RELATORIO,
      dueDate: formatarDataVencimento(),
      description: "Raio-X Financeiro MARK V — Relatório Completo",
      externalReference: diagnostico_id,
      creditCard: {
        holderName: nome_titular,
        number: numeroCartaoLimpo,
        expiryMonth: mes_validade,
        expiryYear: ano_validade,
        ccv: cvv,
      },
      creditCardHolderInfo: {
        name: diagnostico.nome_responsavel,
        email: diagnostico.email,
        cpfCnpj: cpfCnpjLimpo,
        postalCode: cepLimpo,
        addressNumber: numero_endereco,
        phone: diagnostico.telefone ?? undefined,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro ao processar cartão.";
    if (msg.includes("Invalid creditCard")) return { message: "Dados do cartão inválidos. Verifique e tente novamente." };
    if (msg.includes("DECLINED")) return { message: "Cartão recusado. Tente outro cartão." };
    return { message: "Erro ao processar pagamento. Tente novamente." };
  }

  await criarPagamento({
    diagnostico_id,
    asaas_payment_id: asaasPayment.id,
    asaas_customer_id: asaasCustomerId,
    valor: VALOR_RELATORIO,
    metodo: "credit_card",
  });

  // Credit card approved synchronously — trigger PDF and redirect
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  fetch(`${appUrl}/api/pdf/gerar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-token": process.env.PDF_INTERNAL_TOKEN ?? "dev-token-raioxfinanceiro",
    },
    body: JSON.stringify({ diagnosticoId: diagnostico_id }),
  }).catch(() => {});

  redirect(`/relatorio/${diagnostico_id}`);
}
