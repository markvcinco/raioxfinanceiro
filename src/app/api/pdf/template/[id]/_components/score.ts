import { FAIXAS } from "@/content/faixas";
import type { Persona } from "@/types";
import { getScoreColor, wrapPage } from "./shared";

const COR_FAIXA: Record<string, string> = {
  vermelho: "#EF4444",
  laranja: "#F97316",
  amarelo: "#FACC15",
  verde: "#10B981",
};

export function renderScore(
  scoreGeral: number,
  persona: Persona,
  nomeEmpresa: string
): string {
  const faixa = FAIXAS.find((f) => f.id === persona);
  const corFaixa = COR_FAIXA[faixa?.cor ?? "verde"] ?? "#10B981";

  const content = `
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
    <div style="margin-bottom: 48px;">
      <p style="font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 32px;">
        Score Geral
      </p>
      <div style="font-size: 96px; font-weight: 700; color: ${getScoreColor(scoreGeral)}; line-height: 1; margin-bottom: 8px;">
        ${scoreGeral}
      </div>
      <p style="font-size: 14px; color: #71717A;">de 100 pontos</p>
    </div>

    <div style="background: ${corFaixa}15; border: 1px solid ${corFaixa}40; border-radius: 12px; padding: 24px 32px; max-width: 500px; margin-bottom: 32px;">
      <p style="font-size: 16px; font-weight: 600; color: ${corFaixa}; margin-bottom: 8px;">
        ${faixa?.nome ?? ""}
      </p>
      ${faixa && faixa.mensagem_ancora !== "A PRODUZIR" ? `
      <p style="font-size: 13px; color: #A1A1AA; line-height: 1.6;">
        ${faixa.mensagem_ancora}
      </p>` : ""}
    </div>

    <p style="font-size: 11px; color: #71717A; max-width: 400px; line-height: 1.6;">
      O score é calculado como média ponderada das 5 áreas de maturidade financeira,
      a partir de 20 perguntas respondidas pelo gestor.
    </p>
  </div>`;

  return wrapPage(content, 3, nomeEmpresa);
}
