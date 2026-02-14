import type { Metadata } from "next";
import { ResultsDisplay } from "@/components/scorecard/results-display";

export const metadata: Metadata = {
  title: "Your AI Readiness Results",
  description:
    "View your personalized AI Readiness Scorecard results with pillar breakdown, radar chart, and recommendations.",
  robots: { index: false, follow: false },
};

export default function ScorecardResultsPage() {
  return <ResultsDisplay />;
}
