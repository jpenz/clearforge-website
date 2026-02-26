import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Differentiators } from "@/components/home/differentiators";
import { ServicesPreview } from "@/components/home/services-preview";
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
      <ServicesPreview />
      <Results />
      <ScorecardCTA />
      <Founder />
      <FinalCTA />
    </>
  );
}
