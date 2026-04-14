import type { AreaId } from "@/content/areas";
import { AREAS } from "@/content/areas";
import type { Persona, Resposta } from "@/types";
import { calcularTop3Prioridades } from "@/lib/diagnostico/top-3-prioridades";

import { renderCapa } from "./capa";
import { renderCartaAbertura } from "./carta-abertura";
import { renderScore } from "./score";
import { renderRadar } from "./radar";
import { renderAreaPage } from "./area-page";
import { renderPausaEstrategica } from "./pausa-estrategica";
import { renderTop3 } from "./top3";
import { renderPlano90Dias } from "./plano-90-dias";
import { renderUpsellSessao } from "./upsell-sessao";
import { renderSobreMarkV } from "./sobre-markv";

export interface DadosPdfCompleto {
  nomeEmpresa: string;
  nomeResponsavel: string;
  dataGeracao: string;
  scoreGeral: number;
  scoresPorArea: Record<AreaId, number>;
  persona: Persona;
  respostas: Resposta[];
}

export function gerarHtmlCompleto(dados: DadosPdfCompleto): string {
  const {
    nomeEmpresa,
    nomeResponsavel,
    dataGeracao,
    scoreGeral,
    scoresPorArea,
    persona,
    respostas,
  } = dados;

  const prioridades = calcularTop3Prioridades(respostas);

  const pages = [
    renderCapa(nomeEmpresa, nomeResponsavel, dataGeracao),
    renderCartaAbertura(nomeEmpresa),
    renderScore(scoreGeral, persona, nomeEmpresa),
    renderRadar(scoresPorArea, nomeEmpresa),
    renderAreaPage(AREAS[0], scoresPorArea[AREAS[0].id], nomeEmpresa, 5),
    renderAreaPage(AREAS[1], scoresPorArea[AREAS[1].id], nomeEmpresa, 6),
    renderAreaPage(AREAS[2], scoresPorArea[AREAS[2].id], nomeEmpresa, 7),
    renderPausaEstrategica(nomeEmpresa),
    renderAreaPage(AREAS[3], scoresPorArea[AREAS[3].id], nomeEmpresa, 9),
    renderAreaPage(AREAS[4], scoresPorArea[AREAS[4].id], nomeEmpresa, 10),
    renderTop3(prioridades, nomeEmpresa),
    renderPlano90Dias(persona, nomeEmpresa),
    renderUpsellSessao(nomeEmpresa),
    renderSobreMarkV(nomeEmpresa),
  ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Raio-X Financeiro — ${nomeEmpresa}</title>
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
      padding: 30mm 25mm;
      page-break-after: always;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page:last-child {
      page-break-after: auto;
    }

    @media print {
      body { background: #0A0A0A; }
      .page { page-break-after: always; }
      .page:last-child { page-break-after: auto; }
    }
  </style>
</head>
<body>
${pages.join("\n")}
</body>
</html>`;
}
