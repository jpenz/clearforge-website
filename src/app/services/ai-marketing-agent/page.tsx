import { createMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/metadata";
import { AiMarketingAgentPage } from "@/components/pages/ai-marketing-agent-page";

export const metadata = createMetadata({
  title: "AI Marketing & Revenue Operations | One Application of ClearForge Platform",
  description:
    "ClearForge AI Marketing & Revenue Operations is one application of our Strategy-to-Operations platform for full-cycle demand and pipeline execution.",
  path: "/services/ai-marketing-agent",
  keywords: ["AI marketing agent", "AI revenue operations"],
});

const faqs = [
  { question: "Is AI Marketing & Revenue Operations your primary service?", answer: "No. It is one application of the broader ClearForge model, which spans strategy diagnosis, AI system build, and managed operations." },
  { question: "What does this application include?", answer: "It includes demand generation, lead intelligence, outreach workflows, CRM alignment, and pipeline management in one operating model." },
  { question: "Who is this best for?", answer: "CMOs, revenue leaders, portfolio operators, and business owners who need accountable growth execution without managing multiple vendors." },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "AI Marketing & Revenue Operations", path: "/services/ai-marketing-agent" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd({
            title: "AI Marketing & Revenue Operations",
            description: "A full-cycle marketing and revenue operations application of the ClearForge managed AI platform.",
            path: "/services/ai-marketing-agent",
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
