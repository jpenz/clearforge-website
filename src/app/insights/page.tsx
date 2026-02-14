import type { Metadata } from "next";
import { InsightsPageClient } from "@/components/pages/insights-page";

export const metadata: Metadata = {
  title: "Insights — Practical AI Strategy for Business Leaders",
  description:
    "No hype, no jargon. Actionable AI strategy frameworks and lessons from real implementations for CEOs, COOs, and PE leaders.",
  openGraph: {
    title: "Insights — Practical AI Strategy for Business Leaders",
    description:
      "No hype, no jargon. Actionable AI strategy frameworks and lessons from real implementations for CEOs, COOs, and PE leaders.",
  },
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
