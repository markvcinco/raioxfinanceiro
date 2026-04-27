"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { AREAS } from "@/content/areas";
import type { AreaId } from "@/content/areas";

interface RadarScoreChartProps {
  scoresPorArea: Record<AreaId, number>;
}

export function RadarScoreChart({ scoresPorArea }: RadarScoreChartProps) {
  const data = AREAS.map((area) => ({
    area: area.nome.split(" & ")[0], // Keep full area name before "&"
    areaFull: area.nome,
    score: scoresPorArea[area.id] ?? 0,
  }));

  return (
    <div className="w-full aspect-square max-w-[440px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="62%"
          margin={{ top: 28, right: 36, bottom: 28, left: 36 }}
        >
          <PolarGrid stroke="#27272A" />
          <PolarAngleAxis
            dataKey="area"
            tick={{ fill: "#A1A1AA", fontSize: 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#71717A", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#14B866"
            fill="#0F5F3F"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
