import type { Resposta } from "@/types";
import { PERGUNTAS, type Pergunta } from "@/content/perguntas";
import { AREAS } from "@/content/areas";

export interface PrioridadeItem {
  pergunta: Pergunta;
  areaNome: string;
  alternativaTexto: string;
  pontos: number;
}

export function calcularTop3Prioridades(
  respostas: Resposta[]
): PrioridadeItem[] {
  const items: PrioridadeItem[] = respostas
    .map((r) => {
      const pergunta = PERGUNTAS.find((p) => p.id === r.pergunta_id);
      if (!pergunta) return null;

      const alternativa = pergunta.alternativas.find(
        (a) => a.id === r.alternativa_id
      );
      const area = AREAS.find((a) => a.id === pergunta.area_id);

      return {
        pergunta,
        areaNome: area?.nome ?? "",
        alternativaTexto: alternativa?.texto ?? "Não respondida",
        pontos: r.pontos,
      };
    })
    .filter((item): item is PrioridadeItem => item !== null);

  // Sort ascending by pontos, tiebreak by pergunta.numero (ascending)
  items.sort((a, b) => {
    if (a.pontos !== b.pontos) return a.pontos - b.pontos;
    return a.pergunta.numero - b.pergunta.numero;
  });

  return items.slice(0, 3);
}
