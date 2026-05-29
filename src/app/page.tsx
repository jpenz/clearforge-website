import { CredibilityBand } from '@/components/home/credibility-band';
import { Engagements } from '@/components/home/engagements';
import { FinalCta } from '@/components/home/final-cta';
import { Hero } from '@/components/home/hero';
import { Objections } from '@/components/home/objections';
import { Operators } from '@/components/home/operators';
import { ProductionGap } from '@/components/home/production-gap';
import { SelectedWork } from '@/components/home/selected-work';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge — AI That Ships. ROI You Can Prove.',
  description:
    'ClearForge diagnoses the highest-value workflows, ships production AI in 10–14 weeks, and tracks every dollar of impact. Transparent pricing, no platform lock-in. Senior operators only.',
  path: '',
});

/*
 * V9 HOMEPAGE — technical-confident, all-sans, signal blue.
 * Section order (design_handoff/): Hero → PillarStrip → ProductionGap →
 * Engagements → Operators → SelectedWork → CredibilityBand → FinalCTA.
 * Header + Footer come from the root layout.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Objections />
      <ProductionGap />
      <Engagements />
      <Operators />
      <SelectedWork />
      <CredibilityBand />
      <FinalCta />
    </>
  );
}
