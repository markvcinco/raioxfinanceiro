import { PLANO_90_DIAS } from "@/content/plano-90-dias";
import type { Persona } from "@/types";
import { wrapPage } from "./shared";

export function renderPlano90Dias(
  persona: Persona,
  nomeEmpresa: string
): string {
  const plano = PLANO_90_DIAS[persona];
  const faseColors = ["#14B866", "#0EA5E9", "#A855F7"];

  const fasesHtml = plano.fases
    .map((fase, faseIdx) => {
      const cor = faseColors[faseIdx] ?? "#14B866";

      const acoesHtml = fase.acoes
        .map((acao, acaoIdx) => {
          const isPlaceholder = acao.titulo === "A PRODUZIR";
          return `
        <div style="display: flex; gap: 10px; margin-bottom: 8px;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: ${cor}15; border: 1px solid ${cor}40; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;">
            <span style="font-size: 9px; font-weight: 600; color: ${cor};">${faseIdx * 3 + acaoIdx + 1}</span>
          </div>
          <div>
            <p style="font-size: 11px; font-weight: 600; color: ${isPlaceholder ? "#52525B" : "#FAFAFA"}; margin-bottom: 2px;${isPlaceholder ? " font-style: italic;" : ""}">
              ${acao.titulo}
            </p>
            ${!isPlaceholder ? `<p style="font-size: 10px; color: #A1A1AA; line-height: 1.5;">${acao.descricao}</p>` : ""}
          </div>
        </div>`;
        })
        .join("\n");

      return `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid ${cor}30;">
          <div style="width: 4px; height: 20px; background: ${cor}; border-radius: 2px;"></div>
          <h3 style="font-size: 13px; font-weight: 600; color: ${cor};">
            ${fase.label}
          </h3>
        </div>
        ${acoesHtml}
      </div>`;
    })
    .join("\n");

  const content = `
  <div style="padding-top: 25mm;">
    <div style="margin-bottom: 20px;">
      <p style="font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 6px;">
        Plano de Ação
      </p>
      <h2 style="font-size: 20px; font-weight: 700; color: #FAFAFA; margin-bottom: 6px;">
        Seus próximos 90 dias
      </h2>
      <p style="font-size: 11px; color: #71717A;">
        ${plano.titulo_plano}
      </p>
    </div>

    ${fasesHtml}

    <div style="background: #18181B; border: 1px solid #27272A; border-radius: 8px; padding: 16px; margin-top: 8px;">
      <p style="font-size: 10px; color: #71717A; line-height: 1.5;">
        Este plano é um ponto de partida. Para adaptá-lo à realidade específica da sua empresa,
        considere a Sessão Estratégica na página seguinte.
      </p>
    </div>
  </div>`;

  return wrapPage(content, 12, nomeEmpresa);
}
