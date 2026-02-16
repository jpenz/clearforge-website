import { createMetadata } from "@/lib/metadata";
import { InsightsPageClient } from "@/components/pages/insights-page";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "AI strategy, performance improvement, and value creation insights for business leaders. Practical guides, not vendor hype.",
  path: "/insights",
});

export default function InsightsPage() {
  return <InsightsPageClient />;
}
