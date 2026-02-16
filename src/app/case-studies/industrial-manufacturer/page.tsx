import { createMetadata } from "@/lib/metadata";
import { IndustrialManufacturerClient } from "@/components/pages/industrial-manufacturer-page";

export const metadata = createMetadata({
  title: "Case Study: Fortune 1000 Industrial Manufacturer",
  description:
    "How a $2B+ industrial manufacturer with 70+ facilities deployed AI-powered sales intelligence across 16 divisions — discovering 5 new market segments and reducing prospecting time by 60%.",
  path: "/case-studies/industrial-manufacturer",
});

export default function IndustrialManufacturerPage() {
  return <IndustrialManufacturerClient />;
}
