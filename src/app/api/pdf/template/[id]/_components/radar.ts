import { AREAS } from "@/content/areas";
import type { AreaId } from "@/content/areas";
import { gerarRadarSvg } from "@/lib/pdf/radar-svg";
import { getScoreColor, wrapPage } from "./shared";

export function renderRadar(
  scoresPorArea: Record<AreaId, number>,
  nomeEmpresa: string
): string {
  const radarSvg = gerarRadarSvg(scoresPorArea);

  const areaRows = AREAS.map((area) => {
    const score = scoresPorArea[area.id] ?? 0;
    const cor = getScoreColor(score);
    return `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #27272A; font-size: 12px; color: #FAFAFA;">
          ${area.nome}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #27272A; text-align: center; font-size: 11px; color: #A1A1AA;">
          ${Math.round(area.peso * 100)}%
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #27272A; text-align: right;">
          <span style="font-size: 16px; font-weight: 700; color: ${cor};">${score}</span>
          <span style="font-size: 11px; color: #71717A;">/100</span>
        </td>
      </tr>`;
  }).join("\n");

  const content = `
  <div style="padding-top: 20mm;">
    <div style="text-align: center; margin-bottom: 24px;">
      <p style="font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 6px;">
        Maturidade por Área
      </p>
      <p style="font-size: 11px; color: #71717A;">
        Visão comparativa das 5 áreas avaliadas
      </p>
    </div>

    <div style="text-align: center; margin-bottom: 28px;">
      ${radarSvg}
    </div>

    <table style="width: 100%; border-collapse: collapse; border: 1px solid #27272A; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #18181B;">
          <th style="padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
            Área
          </th>
          <th style="padding: 10px 14px; text-align: center; font-size: 10px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
            Peso
          </th>
          <th style="padding: 10px 14px; text-align: right; font-size: 10px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        ${areaRows}
      </tbody>
    </table>
  </div>`;

  return wrapPage(content, 4, nomeEmpresa);
}
