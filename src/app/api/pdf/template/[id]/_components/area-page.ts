import type { Area } from "@/content/areas";
import { selecionarCopyArea } from "@/lib/diagnostico/selecionar-copy";
import { getScoreColor, getFaixaLabel, wrapPage } from "./shared";

export function renderAreaPage(
  area: Area,
  scoreArea: number,
  nomeEmpresa: string,
  pageNum: number
): string {
  const cor = getScoreColor(scoreArea);
  const faixaLabel = getFaixaLabel(scoreArea);
  const copy = selecionarCopyArea(area.id, scoreArea);
  const sections = `
      <div style="margin-top: 20px;">
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 11px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
            O que seu score de ${scoreArea} significa
          </h3>
          <p style="font-size: 11px; line-height: 1.7; color: #D4D4D8;">
            ${copy.score_significa}
          </p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 11px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
            O que está por trás disso
          </h3>
          <p style="font-size: 11px; line-height: 1.7; color: #D4D4D8;">
            ${copy.por_tras_disso}
          </p>
        </div>

        <div>
          <h3 style="font-size: 11px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
            O custo de ignorar
          </h3>
          <p style="font-size: 11px; line-height: 1.7; color: #D4D4D8;">
            ${copy.custo_ignorar}
          </p>
        </div>
      </div>`;

  const content = `
  <div style="padding-top: 25mm;">
    <!-- Area header -->
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <div style="width: 40px; height: 40px; border-radius: 8px; background: #0F5F3F; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <span style="font-size: 14px; font-weight: 700; color: #FAFAFA; letter-spacing: 0.5px;">0${area.numero}</span>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 10px; font-weight: 500; color: #71717A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">
          Área ${area.numero} de 5
        </p>
        <h2 style="font-size: 20px; font-weight: 700; color: #FAFAFA;">
          ${area.nome}
        </h2>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 32px; font-weight: 700; color: ${cor};">${scoreArea}</span>
        <span style="font-size: 13px; color: #71717A;">/100</span>
      </div>
    </div>

    <!-- Score bar -->
    <div style="width: 100%; height: 6px; background: #27272A; border-radius: 3px; margin-bottom: 8px; overflow: hidden;">
      <div style="width: ${scoreArea}%; height: 100%; background: ${cor}; border-radius: 3px;"></div>
    </div>

    <!-- Faixa label + eixo -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <span style="font-size: 11px; color: ${cor}; font-weight: 600;">${faixaLabel}</span>
      <span style="font-size: 10px; color: #71717A; font-style: italic;">${area.eixo}</span>
    </div>

    <div style="width: 100%; height: 1px; background: #27272A; margin-bottom: 4px;"></div>

    ${sections}
  </div>`;

  return wrapPage(content, pageNum, nomeEmpresa);
}
