import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { HowWeWork } from "@/components/home/how-we-work";
import { TransformationFramework } from "@/components/home/transformation-framework";
import { ServicesPreview } from "@/components/home/services-preview";
import { CaseStudyPreview } from "@/components/home/case-study-preview";
import { Differentiators } from "@/components/home/differentiators";
import { FinalCTA } from "@/components/home/final-cta";
import { createMetadata, faqJsonLd } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "AI Strategy Consulting and Managed AI Services for PE and Mid-Market",
  description:
    "ClearForge is a strategy + AI consulting firm that helps PE portfolios, mid-market companies, and enterprise teams close the gap between AI potential and business value.",
  path: "",
  keywords: ["AI value gap", "strategy plus AI consulting"],
});

const homeFaqs = [
  {
    question: "What does ClearForge do?",
    answer:
      "ClearForge diagnoses where your business should be winning, builds production AI systems tied to that strategy, and operates those systems continuously.",
  },
  {
    question: "Who does ClearForge work with?",
    answer:
      "We work with PE operating partners, portfolio company CEOs, owner-led businesses, and enterprise leaders that need strategy and execution from one team.",
  },
  {
    question: "Is AI Marketing & Revenue Operations your main service?",
    answer:
      "It is one application of our broader platform. The core lifecycle is Growth Strategy & Diagnosis, AI Design & Build, and Managed AI Operations.",
  },
  {
    question: "Do you help with change management and team readiness?",
    answer:
      "Yes. We modernize processes and prepare your workforce in tandem. AI that your team cannot operate does not create lasting value. We redesign roles, build adoption plans, and measure human and AI performance together.",
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
      <TransformationFramework />
      <ServicesPreview />
      <CaseStudyPreview />
      <Differentiators />
      <FinalCTA />
    </>
  );
}
