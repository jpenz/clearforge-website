import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { HowWeWork } from "@/components/home/how-we-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { CaseStudyPreview } from "@/components/home/case-study-preview";
import { Differentiators } from "@/components/home/differentiators";
import { FinalCTA } from "@/components/home/final-cta";
import { createMetadata, faqJsonLd } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "ClearForge.ai — AI Marketing Agent & AI Consulting for Mid-Market & PE",
  description:
    "ClearForge delivers AI marketing agents, PE portfolio AI solutions, and AI consulting for mid-market companies. Strategy that ships. AI that performs.",
  path: "",
});

const homeFaqs = [
  {
    question: "What is an AI marketing agent?",
    answer:
      "An AI marketing agent is a full-funnel marketing operating system that combines strategy, execution, and continuous optimization in a single monthly engagement — replacing fragmented agencies and freelancers.",
  },
  {
    question: "Who does ClearForge work with?",
    answer:
      "ClearForge serves PE operating teams, portfolio company CEOs, CMOs under board pressure, and owner-led mid-market businesses that need measurable AI-driven growth.",
  },
  {
    question: "How is ClearForge different from traditional consulting?",
    answer:
      "We don't just deliver strategy decks. The same senior team that sets the plan also builds and operates the systems. Execution lives with strategy.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />
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
