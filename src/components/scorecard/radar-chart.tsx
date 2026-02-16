"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import type { PillarScore } from "@/lib/scorecard";

export default function ScorecardRadarChart({ pillarScores }: { pillarScores: PillarScore[] }) {
  const data = pillarScores.map((p) => ({ name: p.name, score: Math.round(p.percentage), fullMark: 100 }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis dataKey="name" tick={{ fill: "#718096", fontSize: 12 }} />
        <Radar name="Score" dataKey="score" stroke="#B8860B" fill="#B8860B" fillOpacity={0.1} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
