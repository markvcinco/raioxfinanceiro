"use server";

import { redirect } from "next/navigation";
import { leadCapturaSchema, respostaSchema } from "./schemas";
import { calcularScore } from "./calcular-score";
import {
  criarDiagnostico,
  atualizarRespostas,
  buscarDiagnosticoPorId,
  finalizarDiagnostico,
} from "@/lib/supabase/queries";
import { PERGUNTAS } from "@/content/perguntas";
import type { Resposta } from "@/types";

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function criarDiagnosticoAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    nome_responsavel: formData.get("nome_responsavel"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    nome_empresa: formData.get("nome_empresa"),
    faturamento_anual: formData.get("faturamento_anual"),
    setor: formData.get("setor"),
  };

  const parsed = leadCapturaSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const diagnostico = await criarDiagnostico(parsed.data);

  redirect(`/diagnostico/${diagnostico.id}/1`);
}

export async function salvarRespostaAction(
  diagnosticoId: string,
  perguntaId: string,
  alternativaId: string,
  pontos: number,
  numeroPergunta: number
) {
  const parsed = respostaSchema.safeParse({
    diagnostico_id: diagnosticoId,
    pergunta_id: perguntaId,
    alternativa_id: alternativaId,
    pontos,
  });

  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  const diagnostico = await buscarDiagnosticoPorId(diagnosticoId);
  if (!diagnostico) {
    return { error: "Diagnóstico não encontrado" };
  }

  const respostasAtuais = (diagnostico.respostas as Resposta[] | null) ?? [];
  const novasRespostas = respostasAtuais.filter(
    (r) => r.pergunta_id !== perguntaId
  );
  novasRespostas.push({
    pergunta_id: perguntaId,
    alternativa_id: alternativaId,
    pontos,
  });

  await atualizarRespostas(diagnosticoId, novasRespostas);

  const totalPerguntas = PERGUNTAS.length;

  if (numeroPergunta >= totalPerguntas) {
    const resultado = calcularScore(novasRespostas);
    await finalizarDiagnostico(
      diagnosticoId,
      resultado.scoreGeral,
      resultado.scoresPorArea,
      resultado.persona
    );
    redirect(`/diagnostico/${diagnosticoId}/resultado`);
  }

  redirect(`/diagnostico/${diagnosticoId}/${numeroPergunta + 1}`);
}
