import { AREAS } from "@/content/areas";
import type { AreaId } from "@/content/areas";

const CX = 200;
const CY = 200;
const RADIUS = 150;
const LEVELS = 4; // 25, 50, 75, 100

function polarToCartesian(
  angle: number,
  radius: number
): { x: number; y: number } {
  // Start from top (-90°), go clockwise
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

export function gerarRadarSvg(
  scoresPorArea: Record<AreaId, number>
): string {
  const areas = AREAS;
  const n = areas.length;
  const angleStep = 360 / n;

  // Grid lines (concentric pentagons)
  let gridLines = "";
  for (let level = 1; level <= LEVELS; level++) {
    const r = (RADIUS * level) / LEVELS;
    const points: string[] = [];
    for (let i = 0; i < n; i++) {
      const { x, y } = polarToCartesian(i * angleStep, r);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    gridLines += `<polygon points="${points.join(" ")}" fill="none" stroke="#27272A" stroke-width="1" />\n`;
  }

  // Axis lines
  let axisLines = "";
  for (let i = 0; i < n; i++) {
    const { x, y } = polarToCartesian(i * angleStep, RADIUS);
    axisLines += `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#27272A" stroke-width="1" />\n`;
  }

  // Data polygon
  const dataPoints: string[] = [];
  for (let i = 0; i < n; i++) {
    const score = scoresPorArea[areas[i].id] ?? 0;
    const r = (RADIUS * Math.min(100, Math.max(0, score))) / 100;
    const { x, y } = polarToCartesian(i * angleStep, r);
    dataPoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Labels
  let labels = "";
  for (let i = 0; i < n; i++) {
    const { x, y } = polarToCartesian(i * angleStep, RADIUS + 28);
    const shortName = areas[i].nome.split(" & ")[0];
    const anchor =
      Math.abs(x - CX) < 5 ? "middle" : x < CX ? "end" : "start";
    labels += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" fill="#A1A1AA" font-size="11" font-family="Inter, sans-serif">${shortName}</text>\n`;
  }

  // Score values on each axis
  let scoreLabels = "";
  for (let i = 0; i < n; i++) {
    const score = scoresPorArea[areas[i].id] ?? 0;
    const r = (RADIUS * Math.min(100, Math.max(0, score))) / 100;
    const { x, y } = polarToCartesian(i * angleStep, Math.max(r + 16, 30));
    scoreLabels += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="#14B866" font-size="12" font-weight="600" font-family="Inter, sans-serif">${score}</text>\n`;
  }

  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" width="400" height="400">
${gridLines}
${axisLines}
<polygon points="${dataPoints.join(" ")}" fill="rgba(15,95,63,0.35)" stroke="#14B866" stroke-width="2" />
${labels}
${scoreLabels}
</svg>`;
}
