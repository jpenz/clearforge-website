import { createMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/metadata";
import { PricingPage } from "@/components/pages/pricing-page";
import { faqs } from "@/data/pricing";

export const metadata = createMetadata({
  title: "Pricing | AI Strategy, Build, Managed AI Services, and Revenue Ops",
  description:
    "Review ClearForge pricing for Growth Strategy & Diagnosis, AI Design & Build, Managed AI Operations, Legacy System Modernization, and AI Marketing & Revenue Operations tiers.",
  path: "/pricing",
  keywords: ["managed AI services pricing", "AI strategy consulting pricing"],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <PricingPage />
    </>
  );
}
