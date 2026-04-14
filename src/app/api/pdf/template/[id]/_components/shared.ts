export const TOTAL_PAGES = 14;

export function getScoreColor(score: number): string {
  if (score <= 25) return "#EF4444";
  if (score <= 50) return "#F97316";
  if (score <= 75) return "#FACC15";
  return "#10B981";
}

export function getFaixaLabel(score: number): string {
  if (score <= 25) return "Crítico";
  if (score <= 50) return "Frágil";
  if (score <= 75) return "Em construção";
  return "Maduro";
}

export function pageHeader(): string {
  return `
    <div style="position: absolute; top: 15mm; left: 25mm; right: 25mm; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 9px; font-weight: 600; letter-spacing: 2px; color: #14B866; text-transform: uppercase;">RAIO-X FINANCEIRO</span>
      <span style="font-size: 9px; font-weight: 500; color: #52525B;">MARK V</span>
    </div>`;
}

export function pageFooter(
  nomeEmpresa: string,
  pageNum: number
): string {
  return `
    <div style="position: absolute; bottom: 12mm; left: 25mm; right: 25mm; display: flex; justify-content: space-between; font-size: 8px; color: #52525B; border-top: 1px solid #1E1E1E; padding-top: 8px;">
      <span>Raio-X Financeiro MARK V</span>
      <span>${nomeEmpresa}</span>
      <span>Página ${pageNum} de ${TOTAL_PAGES}</span>
    </div>`;
}

export function wrapPage(
  content: string,
  pageNum: number,
  nomeEmpresa: string,
  options?: { noHeader?: boolean; extraStyles?: string }
): string {
  const header = options?.noHeader ? "" : pageHeader();
  const footer = pageFooter(nomeEmpresa, pageNum);
  const extra = options?.extraStyles ?? "";

  return `
<div class="page" style="${extra}">
  ${header}
  ${content}
  ${footer}
</div>`;
}
