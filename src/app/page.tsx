import { AdoptionBand } from '@/components/home/AdoptionBand';
import { EngagementsSection } from '@/components/home/EngagementsSection';
import { HeroSection } from '@/components/home/HeroSection';
import { LineageRow } from '@/components/home/LineageRow';
import { PricingBookingSection } from '@/components/home/PricingBookingSection';
import { ProofSection } from '@/components/home/ProofSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { HOME_FAQS } from '@/data/faqs';
import { faqJsonLd, JsonLdScriptProps, organizationJsonLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <script {...JsonLdScriptProps(organizationJsonLd())} />
      <script {...JsonLdScriptProps(faqJsonLd(HOME_FAQS))} />
      <HeroSection />
      <LineageRow />
      <EngagementsSection />
      <ProofSection />
      <AdoptionBand />
      <ToolsSection />
      <PricingBookingSection />
    </>
  );
}
