import type { PrioridadeItem } from "@/lib/diagnostico/top-3-prioridades";
import { getScoreColor, wrapPage } from "./shared";

export function renderTop3(
  prioridades: PrioridadeItem[],
  nomeEmpresa: string
): string {
  const rankColors = ["#EF4444", "#F97316", "#FACC15"];

  const cards = prioridades
    .map((item, index) => {
      const cor = getScoreColor(item.pontos * 10);
      const rankColor = rankColors[index] ?? "#FACC15";
      const enunciado =
        item.pergunta.enunciado.length > 120
          ? item.pergunta.enunciado.slice(0, 120) + "..."
          : item.pergunta.enunciado;

      return `
      <div style="background: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 18px; margin-bottom: 12px;">
        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: ${rankColor}20; border: 1px solid ${rankColor}40; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span style="font-size: 12px; font-weight: 700; color: ${rankColor};">#${index + 1}</span>
          </div>
          <div style="flex: 1;">
            <p style="font-size: 9px; color: #71717A; margin-bottom: 2px;">${item.areaNome}</p>
            <p style="font-size: 11px; font-weight: 500; color: #FAFAFA; line-height: 1.4;">
              ${enunciado}
            </p>
          </div>
          <div style="text-align: right; flex-shrink: 0;">
            <span style="font-size: 18px; font-weight: 700; color: ${cor};">${item.pontos}</span>
            <span style="font-size: 10px; color: #71717A;">/10</span>
          </div>
        </div>

        <div style="background: #0A0A0A; border-radius: 6px; padding: 10px 12px; margin-bottom: 10px;">
          <p style="font-size: 9px; color: #71717A; margin-bottom: 3px;">Sua resposta:</p>
          <p style="font-size: 10px; color: #D4D4D8; line-height: 1.5;">&ldquo;${item.alternativaTexto}&rdquo;</p>
        </div>

        <div style="display: flex; gap: 16px;">
          <div style="flex: 1;">
            <p style="font-size: 9px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">O que isso revela</p>
            <p style="font-size: 9px; color: #71717A; line-height: 1.5; font-style: italic;">A PRODUZIR</p>
          </div>
          <div style="flex: 1;">
            <p style="font-size: 9px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Por onde começar</p>
            <p style="font-size: 9px; color: #71717A; line-height: 1.5; font-style: italic;">A PRODUZIR</p>
          </div>
        </div>
      </div>`;
    })
    .join("\n");

  const content = `
  <div style="padding-top: 25mm;">
    <div style="margin-bottom: 18px;">
      <p style="font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 6px;">
        Prioridades
      </p>
      <h2 style="font-size: 20px; font-weight: 700; color: #FAFAFA; margin-bottom: 6px;">
        Top 3 Pontos de Atenção
      </h2>
      <p style="font-size: 11px; color: #71717A;">
        As 3 perguntas onde sua empresa teve menor pontuação
      </p>
    </div>

    ${cards}
  </div>`;

  return wrapPage(content, 11, nomeEmpresa);
}
