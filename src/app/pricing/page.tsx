import { createMetadata } from "@/lib/metadata";
import { PricingPage } from "@/components/pages/pricing-page";

export const metadata = createMetadata({
  title: "Pricing | AI Marketing Agent Tiers + Core AI Services",
  description:
    "See ClearForge pricing for AI Marketing Agent tiers (Foundation, Growth, Scale, Enterprise) and core AI strategy/build service options.",
  path: "/pricing",
});

export default function Page() {
  return <PricingPage />;
}
