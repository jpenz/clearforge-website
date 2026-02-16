import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Differentiators } from "@/components/home/differentiators";
import { HowWeWork } from "@/components/home/how-we-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { CaseStudyPreview } from "@/components/home/case-study-preview";
import { Results } from "@/components/home/results";
import { ScorecardCTA } from "@/components/home/scorecard-cta";
import { Founder } from "@/components/home/founder";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Differentiators />
      <HowWeWork />
      <ServicesPreview />
      <CaseStudyPreview />
      <Results />
      <ScorecardCTA />
      <Founder />
      <FinalCTA />
    </>
  );
}
