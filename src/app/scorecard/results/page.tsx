import { createMetadata } from "@/lib/metadata";
import { ResultsDisplay } from "@/components/scorecard/results-display";

export const metadata = createMetadata({
  title: "Your AI Readiness Results",
  description: "Your personalized AI readiness score and recommendations.",
  path: "/scorecard/results",
  noIndex: true,
});

export default function ScorecardResultsPage() {
  return <ResultsDisplay />;
}
