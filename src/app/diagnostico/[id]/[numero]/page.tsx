import { notFound } from "next/navigation";
import { PERGUNTAS } from "@/content/perguntas";
import { AREAS } from "@/content/areas";
import { buscarDiagnosticoPorId } from "@/lib/supabase/queries";
import { PerguntaView } from "@/components/diagnostico/pergunta-view";
import type { Resposta } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string; numero: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { numero } = await params;
  return {
    title: `Pergunta ${numero} — Raio-X Financeiro MARK V`,
  };
}

export default async function PerguntaPage({ params }: PageProps) {
  const { id, numero: numeroStr } = await params;
  const numero = parseInt(numeroStr, 10);

  if (isNaN(numero) || numero < 1 || numero > PERGUNTAS.length) {
    notFound();
  }

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico) {
    notFound();
  }

  const pergunta = PERGUNTAS.find((p) => p.numero === numero);
  if (!pergunta) {
    notFound();
  }

  const area = AREAS.find((a) => a.id === pergunta.area_id);
  const respostasAtuais = (diagnostico.respostas as Resposta[] | null) ?? [];
  const respostaAtual = respostasAtuais.find(
    (r) => r.pergunta_id === pergunta.id
  );

  return (
    <PerguntaView
      diagnosticoId={id}
      pergunta={pergunta}
      numeroPergunta={numero}
      totalPerguntas={PERGUNTAS.length}
      areaNome={area?.nome ?? ""}
      areaNumero={area?.numero ?? 1}
      respostaAtual={respostaAtual}
    />
  );
}
