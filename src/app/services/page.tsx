import { createMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/metadata";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "AI Consulting Services | Strategy, Build, Managed AI Operations",
  description:
    "Explore ClearForge services: Growth Strategy & Diagnosis, AI Design & Build, Managed AI Operations, Legacy System Modernization, and AI Marketing & Revenue Operations.",
  path: "/services",
  keywords: ["AI strategy consulting services", "managed AI operations", "legacy AI modernization"],
});

const services = [
  {
    title: "Growth Strategy & Diagnosis",
    description: "Board-ready strategy and prioritized AI opportunities.",
    path: "/services#growth-strategy-diagnosis",
  },
  {
    title: "AI Design & Build",
    description: "Production AI systems built and deployed in 6-8 weeks.",
    path: "/services#ai-design-build",
  },
  {
    title: "Managed AI Operations",
    description: "Continuous operation and optimization of AI systems.",
    path: "/services#managed-ai-operations",
  },
  {
    title: "Legacy System Modernization",
    description: "Modernize legacy infrastructure so AI can deliver value.",
    path: "/services#legacy-system-modernization",
  },
  {
    title: "AI Marketing & Revenue Operations",
    description: "A platform application for full-cycle revenue execution.",
    path: "/services/ai-marketing-agent",
  },
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
            ]),
          ),
        }}
      />
      {services.map((s) => (
        <script
          key={s.path}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(s)) }}
        />
      ))}
      <ServicesPage />
    </>
  );
}
