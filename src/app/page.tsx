import { AdoptionGap } from '@/components/home/adoption-gap';
import { CaseEvidence } from '@/components/home/case-evidence';
import { CharcoalBand } from '@/components/home/charcoal-band';
import { HomeFaq, homeFaqs } from '@/components/home/faq';
import { ForgeSystem } from '@/components/home/forge-system';
import { Hero } from '@/components/home/hero';
import { MethodLadder } from '@/components/home/method-ladder';
import { TrustMarquee } from '@/components/home/trust-marquee';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { createMetadata, faqJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge | AI Consulting & Custom AI Agents for Mid-Market',
  description:
    'Custom AI agents and automation for mid-market and PE portfolio companies. Readiness diagnostic in 4 weeks, production in 10 to 14, published pricing. Book a 30-min intro.',
  path: '',
});

/*
 * V11 HOMEPAGE — product-grade, proof choreography:
 * Hero (product-as-object: live agent) → Trust marquee (slot #2) →
 * Forge System (the one bento: 4 SKUs as product UI) → Method ladder →
 * Case evidence → Charcoal band (the one dark moment: credibility + CTA).
 * A number in every viewport, tied to a name.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <AdoptionGap />
      <ForgeSystem />
      <MethodLadder />
      <CaseEvidence />
      <HomeFaq />
      <CharcoalBand />
      <JsonLdScript data={faqJsonLd(homeFaqs)} />
    </>
  );
}
