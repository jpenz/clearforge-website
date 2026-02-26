import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { serviceJsonLd } from "@/lib/metadata";
import { notFound } from "next/navigation";

const service = getServiceBySlug("custom-ai-agents")!;

export const metadata: Metadata = {
  title: "Custom AI Agents",
  description:
    "Bespoke AI agents for sales, ops, and finance — built for your specific workflows, not off-the-shelf chatbots.",
  openGraph: {
    title: "Custom AI Agents — ClearForge.ai",
    description:
      "Bespoke AI agents for sales, ops, and finance — built for your specific workflows, not off-the-shelf chatbots.",
  },
};

export default function CustomAIAgentsPage() {
  if (!service) return notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
