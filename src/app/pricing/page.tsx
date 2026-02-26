import { createMetadata } from "@/lib/metadata";
import { PricingPageClient } from "@/components/pages/pricing-page";

export const metadata = createMetadata({
  title: "Pricing — AI Readiness Audit, Performance Sprint, Retainer, Managed Services",
  description: "Transparent pricing for AI consulting. From $15K audits to ongoing managed services. Two models: Build & Transfer or Managed Services.",
  path: "/pricing",
});

export default function Page() {
  return <PricingPageClient />;
}
