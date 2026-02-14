import type { Metadata } from "next";
import { ScorecardPageClient } from "@/components/pages/scorecard-page";

export const metadata: Metadata = {
  title: "AI Readiness Scorecard — Free Assessment",
  description:
    "Take the free 5-minute AI Readiness Scorecard. 18 questions across 5 pillars give you a personalized score with actionable recommendations.",
  openGraph: {
    title: "AI Readiness Scorecard — Free Assessment",
    description:
      "Take the free 5-minute AI Readiness Scorecard. 18 questions across 5 pillars give you a personalized score with actionable recommendations.",
  },
};

export default function ScorecardPage() {
  return <ScorecardPageClient />;
}
