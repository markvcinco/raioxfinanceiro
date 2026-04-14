import type { AreaId } from "@/content/areas";
import { COPY_AREAS, type CopyFaixa } from "@/content/copy-areas";

export function selecionarCopyArea(
  areaId: AreaId,
  scoreArea: number
): CopyFaixa {
  const copy = COPY_AREAS[areaId];
  if (scoreArea <= 25) return copy.faixa_critico;
  if (scoreArea <= 50) return copy.faixa_fragil;
  if (scoreArea <= 75) return copy.faixa_construcao;
  return copy.faixa_maduro;
}
