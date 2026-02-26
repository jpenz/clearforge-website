import { createMetadata } from "@/lib/metadata";
import { InsightsPage } from "@/components/pages/insights-page";

export const metadata = createMetadata({
  title: "Insights — AI Strategy, Performance Improvement, and Value Creation",
  description: "Practical AI execution insights for CEOs, PE operating partners, and owner-led companies in the mid-market and lower middle market.",
  path: "/insights",
});

export default function Page() {
  return <InsightsPage />;
}
