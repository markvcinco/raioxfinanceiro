import { AREAS } from "@/content/areas";
import { PERGUNTAS } from "@/content/perguntas";
import { FAIXAS } from "@/content/faixas";
import type { AreaId } from "@/content/areas";
import type { Persona } from "@/types";

export interface Resposta {
  pergunta_id: string;
  alternativa_id: string;
  pontos: number;
}

export interface ScoreResult {
  scoreGeral: number;
  scoresPorArea: Record<AreaId, number>;
  persona: Persona;
}

/**
 * Calcula o score geral, scores por área e persona a partir das respostas.
 *
 * Lógica:
 * 1. Score de cada área = média dos pontos das 4 perguntas daquela área × 10 (escala 0-100)
 * 2. Score geral = soma ponderada dos scores das áreas pelos pesos definidos
 * 3. Persona = faixa do score geral
 *
 * Respostas ausentes para uma pergunta contam como 0 pontos.
 * Pontos são clamped entre 0 e 10.
 */
export function calcularScore(respostas: Resposta[]): ScoreResult {
  const respostasPorPergunta = new Map<string, number>();
  for (const r of respostas) {
    const pontos = Math.max(0, Math.min(10, r.pontos));
    respostasPorPergunta.set(r.pergunta_id, pontos);
  }

  const scoresPorArea = {} as Record<AreaId, number>;

  for (const area of AREAS) {
    const perguntasDaArea = PERGUNTAS.filter((p) => p.area_id === area.id);
    const totalPontos = perguntasDaArea.reduce((soma, p) => {
      return soma + (respostasPorPergunta.get(p.id) ?? 0);
    }, 0);

    // Média das 4 perguntas (0-10) × 10 = escala 0-100
    const media = perguntasDaArea.length > 0
      ? totalPontos / perguntasDaArea.length
      : 0;
    scoresPorArea[area.id] = Math.round(media * 10);
  }

  // Score geral = soma ponderada
  let scoreGeral = 0;
  for (const area of AREAS) {
    scoreGeral += scoresPorArea[area.id] * area.peso;
  }
  scoreGeral = Math.round(scoreGeral);

  // Determinar persona pela faixa
  const faixa = FAIXAS.find(
    (f) => scoreGeral >= f.score_min && scoreGeral <= f.score_max
  );
  const persona: Persona = faixa?.id ?? "apagando_incendio";

  return { scoreGeral, scoresPorArea, persona };
}
