import { createMetadata } from "@/lib/metadata";
import { ServicesPageClient } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "Services",
  description:
    "AI Revenue Operations, Performance Improvement, PE Value Creation, and Custom AI Agents. Strategy that ships, AI that performs.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageClient />;
}
