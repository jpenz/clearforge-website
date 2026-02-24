import { createMetadata } from "@/lib/metadata";
import { AiMarketingAgentPage } from "@/components/pages/ai-marketing-agent-page";

export const metadata = createMetadata({
  title: "AI Marketing Agent | ClearForge.ai",
  description:
    "ClearForge AI Marketing Agent delivers full-funnel strategy, execution, and optimization for PE-backed and mid-market companies.",
  path: "/services/ai-marketing-agent",
});

export default function Page() {
  return <AiMarketingAgentPage />;
}
