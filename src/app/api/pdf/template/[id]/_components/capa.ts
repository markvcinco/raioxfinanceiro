import { TOTAL_PAGES } from "./shared";

export function renderCapa(
  nomeEmpresa: string,
  nomeResponsavel: string,
  dataGeracao: string
): string {
  return `
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
      ${nomeEmpresa}
    </p>
    <p style="font-size: 14px; color: #A1A1AA; margin-bottom: 4px;">
      Responsável: ${nomeResponsavel}
    </p>
    <p style="font-size: 14px; color: #A1A1AA;">
      Gerado em ${dataGeracao}
    </p>
  </div>

  <div style="position: absolute; bottom: 12mm; left: 25mm; right: 25mm; display: flex; justify-content: space-between; font-size: 8px; color: #52525B;">
    <span>Raio-X Financeiro MARK V</span>
    <span>Confidencial</span>
    <span>Página 1 de ${TOTAL_PAGES}</span>
  </div>
</div>`;
}
