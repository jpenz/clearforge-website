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
        <PolarGrid stroke="#E5E1DA" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "#3D4F5F", fontSize: 12 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#0B1D33"
          fill="#C8963E"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
