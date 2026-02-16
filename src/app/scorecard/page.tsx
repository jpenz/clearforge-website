import { createMetadata } from "@/lib/metadata";
import { ScorecardPage } from "@/components/pages/scorecard-page";

export const metadata = createMetadata({
  title: "AI Readiness Scorecard — Assess Your Business in 5 Minutes",
  description: "18 questions across 5 pillars. Get a personalized AI readiness score with specific recommendations for your business.",
  path: "/scorecard",
});

export default function Page() {
  return <ScorecardPage />;
}
