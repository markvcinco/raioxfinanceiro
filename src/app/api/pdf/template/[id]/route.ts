import { NextRequest, NextResponse } from "next/server";
import { buscarDiagnosticoPorId } from "@/lib/supabase/queries";
import { gerarHtmlPdf } from "@/lib/pdf/template";
import type { AreaId } from "@/content/areas";

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

  const html = gerarHtmlPdf({
    nomeEmpresa: diagnostico.nome_empresa,
    nomeResponsavel: diagnostico.nome_responsavel,
    dataGeracao: new Date(diagnostico.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    scoreGeral: diagnostico.score_geral ?? 0,
    scoresPorArea,
    persona: diagnostico.persona ?? "apagando_incendio",
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
