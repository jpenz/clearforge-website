import { createMetadata } from "@/lib/metadata";
import { IndustrialManufacturerPage } from "@/components/pages/industrial-manufacturer-page";

export const metadata = createMetadata({
  title: "Case Study: Fortune 1000 Industrial Manufacturer — 1,060 Opportunities Identified",
  description: "How a $2B+ industrial manufacturer deployed AI-powered sales intelligence across 16 divisions, discovering 5 new high-growth market segments.",
  path: "/case-studies/industrial-manufacturer",
});

export default function Page() {
  return <IndustrialManufacturerPage />;
}
