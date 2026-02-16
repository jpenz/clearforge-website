import { createMetadata } from "@/lib/metadata";
import { ScorecardResultsPage } from "@/components/pages/scorecard-results-page";

export const metadata = createMetadata({
  title: "Your AI Readiness Results",
  description: "Your personalized AI readiness assessment results with specific recommendations.",
  path: "/scorecard/results",
  noIndex: true,
});

export default function Page() {
  return <ScorecardResultsPage />;
}
