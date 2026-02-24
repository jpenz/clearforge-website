import { createMetadata, serviceJsonLd, faqJsonLd } from "@/lib/metadata";
import { AiMarketingAgentPage } from "@/components/pages/ai-marketing-agent-page";

export const metadata = createMetadata({
  title: "AI Marketing Agent | Full-Funnel AI Marketing for PE & Mid-Market",
  description:
    "ClearForge AI Marketing Agent delivers full-funnel strategy, execution, and optimization for PE-backed and mid-market companies. Replace fragmented agencies with one AI-powered operating system.",
  path: "/services/ai-marketing-agent",
});

const faqs = [
  { question: "What does the AI Marketing Agent include?", answer: "Always-on campaign operations, lead intelligence and prioritization, real-time leadership dashboards, and continuous weekly optimization across paid, organic, content, and outreach channels." },
  { question: "How long is the commitment?", answer: "Month-to-month after an initial 90-day ramp period. No long lock-ins." },
  { question: "Who is this for?", answer: "PE-backed portfolio companies and mid-market businesses that need predictable pipeline growth without building a full internal marketing team." },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            title: "AI Marketing Agent",
            description: "Full-funnel AI marketing operating system for PE-backed and mid-market companies.",
            slug: "ai-marketing-agent",
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <AiMarketingAgentPage />
    </>
  );
}
