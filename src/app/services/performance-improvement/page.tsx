import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { serviceJsonLd } from "@/lib/metadata";
import { notFound } from "next/navigation";

const service = getServiceBySlug("performance-improvement")!;

export const metadata: Metadata = {
  title: "Performance Improvement",
  description:
    "Process mining, operational diagnostics, and custom automation to cut waste and drive measurable savings.",
  openGraph: {
    title: "Performance Improvement — ClearForge.ai",
    description:
      "Process mining, operational diagnostics, and custom automation to cut waste and drive measurable savings.",
  },
};

export default function PerformanceImprovementPage() {
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
