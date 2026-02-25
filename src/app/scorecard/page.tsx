import { createMetadata } from "@/lib/metadata";
import { ScorecardPage } from "@/components/pages/scorecard-page";

export const metadata = createMetadata({
  title: "AI Maturity Scorecard - Where Does Your Business Stand?",
  description: "The AI value gap is widening. 18 questions across 5 pillars to assess your readiness for AI agents, agentic workflows, and hybrid workforce operations.",
  path: "/scorecard",
});

export default function Page() {
  return <ScorecardPage />;
}
