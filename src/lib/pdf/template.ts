import { AREAS } from "@/content/areas";
import { FAIXAS } from "@/content/faixas";
import { gerarRadarSvg } from "./radar-svg";
import type { AreaId } from "@/content/areas";

interface DadosPdf {
  nomeEmpresa: string;
  nomeResponsavel: string;
  dataGeracao: string;
  scoreGeral: number;
  scoresPorArea: Record<AreaId, number>;
  persona: string;
}

const COR_FAIXA: Record<string, string> = {
  vermelho: "#EF4444",
  laranja: "#F97316",
  amarelo: "#FACC15",
  verde: "#10B981",
};

function getScoreColor(score: number): string {
  if (score <= 25) return "#EF4444";
  if (score <= 50) return "#F97316";
  if (score <= 75) return "#FACC15";
  return "#10B981";
}

export function gerarHtmlPdf(dados: DadosPdf): string {
  const faixa = FAIXAS.find((f) => f.id === dados.persona);
  const corFaixa = COR_FAIXA[faixa?.cor ?? "verde"] ?? "#10B981";
  const radarSvg = gerarRadarSvg(dados.scoresPorArea);

  const areaRows = AREAS.map((area) => {
    const score = dados.scoresPorArea[area.id] ?? 0;
    const cor = getScoreColor(score);
    return `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #27272A; font-size: 14px; color: #FAFAFA;">
          ${area.nome}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #27272A; text-align: center; font-size: 13px; color: #A1A1AA;">
          ${Math.round(area.peso * 100)}%
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #27272A; text-align: right;">
          <span style="font-size: 18px; font-weight: 700; color: ${cor};">${score}</span>
          <span style="font-size: 12px; color: #71717A;">/100</span>
        </td>
      </tr>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Raio-X Financeiro — ${dados.nomeEmpresa}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0A0A0A;
      color: #FAFAFA;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 40mm 25mm;
      page-break-after: always;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page:last-child {
      page-break-after: auto;
    }

    .page-footer {
      position: absolute;
      bottom: 15mm;
      left: 25mm;
      right: 25mm;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #71717A;
    }

    @media print {
      body { background: #0A0A0A; }
      .page { page-break-after: always; }
      .page:last-child { page-break-after: auto; }
    }
  </style>
</head>
<body>

<!-- ===== PAGE 1: CAPA ===== -->
<div class="page" style="justify-content: center; align-items: center; text-align: center;">
  <div style="margin-bottom: 60px;">
    <div style="font-size: 13px; font-weight: 600; letter-spacing: 3px; color: #14B866; text-transform: uppercase; margin-bottom: 16px;">
      MARK V
    </div>
    <h1 style="font-size: 36px; font-weight: 700; line-height: 1.2; margin-bottom: 8px;">
      Raio-X Financeiro
    </h1>
    <p style="font-size: 16px; color: #A1A1AA;">
      Diagnóstico da maturidade financeira
    </p>
  </div>

  <div style="width: 80px; height: 2px; background: #0F5F3F; margin: 0 auto 60px;"></div>

  <div>
    <p style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">
      ${dados.nomeEmpresa}
    </p>
    <p style="font-size: 14px; color: #A1A1AA; margin-bottom: 4px;">
      Responsável: ${dados.nomeResponsavel}
    </p>
    <p style="font-size: 14px; color: #A1A1AA;">
      Gerado em ${dados.dataGeracao}
    </p>
  </div>

  <div class="page-footer">
    <span>Raio-X Financeiro MARK V</span>
    <span>Confidencial</span>
    <span>Página 1</span>
  </div>
</div>

<!-- ===== PAGE 2: SCORE GERAL ===== -->
<div class="page" style="justify-content: center; align-items: center; text-align: center;">
  <div style="margin-bottom: 48px;">
    <p style="font-size: 13px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 32px;">
      Score Geral
    </p>
    <div style="font-size: 96px; font-weight: 700; color: ${getScoreColor(dados.scoreGeral)}; line-height: 1; margin-bottom: 8px;">
      ${dados.scoreGeral}
    </div>
    <p style="font-size: 14px; color: #71717A;">de 100 pontos</p>
  </div>

  <div style="background: ${corFaixa}15; border: 1px solid ${corFaixa}40; border-radius: 12px; padding: 24px 32px; max-width: 500px; margin-bottom: 32px;">
    <p style="font-size: 16px; font-weight: 600; color: ${corFaixa}; margin-bottom: 8px;">
      ${faixa?.nome ?? ""}
    </p>
    ${faixa && faixa.mensagem_ancora !== "A PRODUZIR" ? `
    <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6;">
      ${faixa.mensagem_ancora}
    </p>` : ""}
  </div>

  <p style="font-size: 12px; color: #71717A; max-width: 400px;">
    O score é calculado como média ponderada das 5 áreas de maturidade financeira,
    a partir de 20 perguntas respondidas pelo gestor.
  </p>

  <div class="page-footer">
    <span>Raio-X Financeiro MARK V</span>
    <span>${dados.nomeEmpresa}</span>
    <span>Página 2</span>
  </div>
</div>

<!-- ===== PAGE 3: RADAR + TABELA ===== -->
<div class="page">
  <div style="text-align: center; margin-bottom: 32px;">
    <p style="font-size: 13px; font-weight: 500; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase; margin-bottom: 8px;">
      Maturidade por Área
    </p>
    <p style="font-size: 12px; color: #71717A;">
      Visão comparativa das 5 áreas avaliadas
    </p>
  </div>

  <div style="text-align: center; margin-bottom: 40px;">
    ${radarSvg}
  </div>

  <table style="width: 100%; border-collapse: collapse; border: 1px solid #27272A; border-radius: 8px; overflow: hidden;">
    <thead>
      <tr style="background: #18181B;">
        <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
          Área
        </th>
        <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
          Peso
        </th>
        <th style="padding: 12px 16px; text-align: right; font-size: 12px; font-weight: 500; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #27272A;">
          Score
        </th>
      </tr>
    </thead>
    <tbody>
      ${areaRows}
    </tbody>
  </table>

  <div class="page-footer">
    <span>Raio-X Financeiro MARK V</span>
    <span>${dados.nomeEmpresa}</span>
    <span>Página 3</span>
  </div>
</div>

</body>
</html>`;
}
