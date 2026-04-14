import { NextRequest, NextResponse } from "next/server";
import { buscarDiagnosticoPorId } from "@/lib/supabase/queries";
import { gerarHtmlCompleto } from "./_components";
import type { AreaId } from "@/content/areas";
import type { Persona, Resposta } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!diagnostico.score_geral && diagnostico.score_geral !== 0) {
    return NextResponse.json({ error: "Diagnostico not finalized" }, { status: 400 });
  }

  const scoresPorArea = (diagnostico.score_areas ?? {}) as Record<AreaId, number>;
  const respostas = (diagnostico.respostas ?? []) as unknown as Resposta[];
  const persona = (diagnostico.persona ?? "apagando_incendio") as Persona;

  const html = gerarHtmlCompleto({
    nomeEmpresa: diagnostico.nome_empresa,
    nomeResponsavel: diagnostico.nome_responsavel,
    dataGeracao: new Date(diagnostico.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    scoreGeral: diagnostico.score_geral ?? 0,
    scoresPorArea,
    persona,
    respostas,
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
