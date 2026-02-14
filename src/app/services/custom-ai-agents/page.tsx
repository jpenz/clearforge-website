import { getServiceBySlug } from "@/data/services";
import { ServiceDetail } from "@/components/service-detail";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Custom AI Agents — ClearForge.ai",
  description:
    "Bespoke AI agents for sales, ops, and finance — built for your specific workflows, not off-the-shelf chatbots.",
};

export default function CustomAIAgentsPage() {
  const service = getServiceBySlug("custom-ai-agents");
  if (!service) return notFound();
  return <ServiceDetail service={service} />;
}
