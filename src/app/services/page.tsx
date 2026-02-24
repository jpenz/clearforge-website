import { createMetadata, serviceJsonLd } from "@/lib/metadata";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "AI Consulting Services | AI Marketing Agent, Strategy & Build for Mid-Market",
  description:
    "ClearForge AI consulting services for PE portfolio companies and mid-market businesses. AI marketing agent, AI strategy, AI design & build, agent retainer, and managed AI services.",
  path: "/services",
});

const services = [
  { title: "AI Marketing Agent", description: "Full-funnel marketing operating system for PE-backed and mid-market companies.", slug: "ai-marketing-agent" },
  { title: "AI Strategy & Market Intelligence", description: "Board-ready AI strategy before you commit implementation dollars.", slug: "ai-strategy" },
  { title: "AI Design & Build", description: "Production AI systems shipped in 6-8 weeks tied to operating outcomes.", slug: "ai-design-build" },
  { title: "AI Agent Retainer", description: "Continuous monthly AI build capacity with weekly operating cadence.", slug: "ai-agent-retainer" },
  { title: "Managed AI Services", description: "We build and run AI systems as an ongoing service.", slug: "managed-ai-services" },
];

export default function Page() {
  return (
    <>
      {services.map((s) => (
        <script
          key={s.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(s)) }}
        />
      ))}
      <ServicesPage />
    </>
  );
}
