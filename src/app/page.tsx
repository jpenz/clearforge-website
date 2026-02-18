import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { HowWeWork } from "@/components/home/how-we-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { CaseStudyPreview } from "@/components/home/case-study-preview";
import { Differentiators } from "@/components/home/differentiators";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowWeWork />
      <ServicesPreview />
      <CaseStudyPreview />
      <Differentiators />
      <FinalCTA />
    </>
  );
}
