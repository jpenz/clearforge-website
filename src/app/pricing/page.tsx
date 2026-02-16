import { createMetadata } from "@/lib/metadata";
import { PricingPageClient } from "@/components/pages/pricing-page";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for AI consulting. AI Readiness Audit ($15K), Performance Sprint ($50-100K), AI Agent Retainer ($15K/mo). No hidden fees.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
