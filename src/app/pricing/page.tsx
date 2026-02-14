import type { Metadata } from "next";
import { faqJsonLd } from "@/lib/metadata";
import { faqs } from "@/data/pricing";
import { PricingPageClient } from "@/components/pages/pricing-page";

export const metadata: Metadata = {
  title: "Pricing — AI Readiness Audit, Performance Sprint & Retainer",
  description:
    "Transparent pricing for ClearForge AI consulting. AI Readiness Audit ($15K), Performance Sprint ($50K–$100K), or AI Agent Retainer ($15K/mo). See what's included.",
  openGraph: {
    title: "Pricing — AI Readiness Audit, Performance Sprint & Retainer",
    description:
      "Transparent pricing for ClearForge AI consulting. AI Readiness Audit ($15K), Performance Sprint ($50K–$100K), or AI Agent Retainer ($15K/mo).",
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <PricingPageClient />
    </>
  );
}
