import { createMetadata } from "@/lib/metadata";
import { ScorecardPageClient } from "@/components/pages/scorecard-page";

export const metadata = createMetadata({
  title: "AI Readiness Scorecard",
  description:
    "How AI-ready is your business? Take our 5-minute assessment across 5 key pillars to get your personalized AI readiness score.",
  path: "/scorecard",
});

export default function ScorecardPage() {
  return <ScorecardPageClient />;
}
