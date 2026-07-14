import { AdoptionGap } from '@/components/home/adoption-gap';
import { CaseEvidence } from '@/components/home/case-evidence';
import { CharcoalBand } from '@/components/home/charcoal-band';
import { ForgeSystem } from '@/components/home/forge-system';
import { Hero } from '@/components/home/hero';
import { MethodLadder } from '@/components/home/method-ladder';
import { TrustMarquee } from '@/components/home/trust-marquee';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge — AI That Actually Ships',
  description:
    'ClearForge finds your highest-value workflows, builds production AI, and proves the ROI — in 10–14 weeks, with pricing you can see. Try Forge Intelligence™ live: paste your URL, get your readiness band and top AI plays in about a minute.',
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
      <CharcoalBand />
    </>
  );
}
