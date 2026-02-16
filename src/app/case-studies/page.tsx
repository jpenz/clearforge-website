import { createMetadata } from "@/lib/metadata";
import { CaseStudiesPageClient } from "@/components/pages/case-studies-page";

export const metadata = createMetadata({
  title: "Case Studies",
  description:
    "Real results from real businesses. See how ClearForge delivers measurable AI-driven outcomes for mid-market companies and PE portfolios.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
