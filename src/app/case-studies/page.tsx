import { createMetadata } from "@/lib/metadata";
import { CaseStudiesPage } from "@/components/pages/case-studies-page";

export const metadata = createMetadata({
  title: "Case Studies — Real Results from AI Implementation",
  description: "Real engagements, real outcomes. See how ClearForge delivers measurable results for mid-market companies and PE portfolio companies.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPage />;
}
