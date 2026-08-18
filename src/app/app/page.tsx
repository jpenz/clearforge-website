import { HeroSection } from "@/components/home/HeroSection";
import { EngagementsSection } from "@/components/home/EngagementsSection";
import { ProofSection } from "@/components/home/ProofSection";
import { AdoptionBand } from "@/components/home/AdoptionBand";
import { ToolsSection } from "@/components/home/ToolsSection";
import { PricingBookingSection } from "@/components/home/PricingBookingSection";
import { HOME_FAQS } from "@/data/faqs";
import { faqJsonLd, JsonLdScriptProps, organizationJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script {...JsonLdScriptProps(organizationJsonLd())} />
      <script {...JsonLdScriptProps(faqJsonLd(HOME_FAQS))} />
      <HeroSection />
      <EngagementsSection />
      <ProofSection />
      <AdoptionBand />
      <ToolsSection />
      <PricingBookingSection />
    </>
  );
}
