import { createMetadata } from "@/lib/metadata";
import { InsightsPage } from "@/components/pages/insights-page";

export const metadata = createMetadata({
  title: "Insights - AI Strategy, Performance Improvement, and Value Creation",
  description: "Practical perspectives on AI implementation, performance improvement, and value creation for mid-market companies.",
  path: "/insights",
});

export default function Page() {
  return <InsightsPage />;
}
