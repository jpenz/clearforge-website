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
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
