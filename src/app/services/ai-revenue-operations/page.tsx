import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { notFound } from "next/navigation";

export const metadata = {
  title: "AI Revenue Operations — ClearForge.ai",
  description:
    "AI-powered sales automation, intent signals, and pipeline analytics that turn data into deals.",
};

export default function AIRevenueOperationsPage() {
  const service = getServiceBySlug("ai-revenue-operations");
  if (!service) return notFound();
  return <ServiceDetail service={service} />;
}
