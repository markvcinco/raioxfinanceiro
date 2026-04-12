import { createAdminClient } from "./admin";
import type { Json } from "./database.types";
import type {
  DiagnosticoInsert,
  PagamentoInsert,
  Resposta,
  ScoreAreas,
  Persona,
} from "@/types";

// All queries use the admin client (service_role) because v1 has no
// user-facing auth. RLS is enabled but only service_role bypasses it.

function getAdmin() {
  return createAdminClient();
}

// ---------------------------------------------------------------------------
// Diagnosticos
// ---------------------------------------------------------------------------

export async function criarDiagnostico(
  dados: Pick<
    DiagnosticoInsert,
    | "nome_responsavel"
    | "email"
    | "telefone"
    | "nome_empresa"
    | "faturamento_anual"
    | "setor"
  >
) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("diagnosticos")
    .insert(dados)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar diagnóstico: ${error.message}`);
  }

  return data;
}

export async function atualizarRespostas(id: string, respostas: Resposta[]) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("diagnosticos")
    .update({ respostas: respostas as unknown as Json })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao atualizar respostas: ${error.message}`);
  }

  return data;
}

export async function finalizarDiagnostico(
  id: string,
  scoreGeral: number,
  scoreAreas: ScoreAreas,
  persona: Persona
) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("diagnosticos")
    .update({
      score_geral: scoreGeral,
      score_areas: scoreAreas as unknown as Json,
      persona,
      status: "concluido",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao finalizar diagnóstico: ${error.message}`);
  }

  return data;
}

export async function buscarDiagnosticoPorId(id: string) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("diagnosticos")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`Erro ao buscar diagnóstico: ${error.message}`);
  }

  return data;
}

// ---------------------------------------------------------------------------
// Pagamentos
// ---------------------------------------------------------------------------

export async function criarPagamento(
  dados: Pick<
    PagamentoInsert,
    "diagnostico_id" | "asaas_payment_id" | "asaas_customer_id" | "valor" | "metodo"
  >
) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("pagamentos")
    .insert(dados)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar pagamento: ${error.message}`);
  }

  return data;
}

export async function buscarPagamentoPorAsaasId(asaasPaymentId: string) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("pagamentos")
    .select()
    .eq("asaas_payment_id", asaasPaymentId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Erro ao buscar pagamento: ${error.message}`);
  }

  return data;
}

export async function buscarPagamentoPorDiagnosticoId(diagnosticoId: string) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("pagamentos")
    .select()
    .eq("diagnostico_id", diagnosticoId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Erro ao buscar pagamento: ${error.message}`);
  }

  return data;
}

export async function confirmarPagamento(
  asaasPaymentId: string,
  rawWebhook: unknown
) {
  const supabase = getAdmin();

  const agora = new Date().toISOString();

  // Update pagamento
  const { data: pagamento, error: errPag } = await supabase
    .from("pagamentos")
    .update({
      status: "confirmado",
      pago_em: agora,
      raw_webhook: rawWebhook as Json,
    })
    .eq("asaas_payment_id", asaasPaymentId)
    .select()
    .single();

  if (errPag) {
    throw new Error(`Erro ao confirmar pagamento: ${errPag.message}`);
  }

  // Update diagnostico status
  const { error: errDiag } = await supabase
    .from("diagnosticos")
    .update({
      status: "pago",
      pago_em: agora,
    })
    .eq("id", pagamento.diagnostico_id);

  if (errDiag) {
    throw new Error(`Erro ao atualizar diagnóstico pós-pagamento: ${errDiag.message}`);
  }

  return pagamento;
}

export async function listarPagamentosRecentes(limite = 50) {
  const supabase = getAdmin();

  const { data, error } = await supabase
    .from("leads_view")
    .select()
    .not("pagamento_id", "is", null)
    .order("pago_em", { ascending: false, nullsFirst: false })
    .limit(limite);

  if (error) {
    throw new Error(`Erro ao listar pagamentos: ${error.message}`);
  }

  return data;
}
