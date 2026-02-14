import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { notFound } from "next/navigation";

export const metadata = {
  title: "PE Value Creation — ClearForge.ai",
  description:
    "AI-driven value creation for PE firms and portfolio companies. 90-day sprints to EBITDA improvement.",
};

export default function PEValueCreationPage() {
  const service = getServiceBySlug("pe-value-creation");
  if (!service) return notFound();
  return <ServiceDetail service={service} />;
}
