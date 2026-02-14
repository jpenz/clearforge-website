"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { PillarScore } from "@/lib/scorecard";

interface RadarChartProps {
  pillarScores: PillarScore[];
}

export default function ScorecardRadarChart({
  pillarScores,
}: RadarChartProps) {
  const data = pillarScores.map((p) => ({
    name: p.name,
    score: Math.round(p.percentage),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="var(--color-border-medium)" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="var(--color-blue)"
          fill="var(--color-blue)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
