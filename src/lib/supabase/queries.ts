import { createAdminClient } from "./admin";
import type { Json } from "./database.types";
import type {
  DiagnosticoInsert,
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
