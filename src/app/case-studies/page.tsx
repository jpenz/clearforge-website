import { createMetadata } from "@/lib/metadata";
import { CaseStudiesPageClient } from "@/components/pages/case-studies-page";

export const metadata = createMetadata({
  title: "Case Studies — Real Results from AI Implementation",
  description: "Real engagements and measured outcomes for mid-market CEOs, PE portfolio operators, and owner-led businesses driving value creation with AI.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPageClient />;
}
