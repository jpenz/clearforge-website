import { createMetadata } from "@/lib/metadata";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "Services — AI Revenue Operations, Performance Improvement, PE Value Creation",
  description: "Three service lines focused on turning AI into measurable business outcomes. From sales intelligence to portfolio-wide value creation.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
