import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Performance Improvement — ClearForge.ai",
  description:
    "Process mining, operational diagnostics, and custom automation to cut waste and drive measurable savings.",
};

export default function PerformanceImprovementPage() {
  const service = getServiceBySlug("performance-improvement");
  if (!service) return notFound();
  return <ServiceDetail service={service} />;
}
