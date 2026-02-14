import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/pages/services-page";

export const metadata: Metadata = {
  title: "Services — AI Revenue Ops, Performance, PE Value Creation & Custom Agents",
  description:
    "Four practice areas delivering measurable business impact: AI Revenue Operations, Performance Improvement, PE Value Creation, and Custom AI Agents.",
  openGraph: {
    title: "Services — AI Revenue Ops, Performance, PE Value Creation & Custom Agents",
    description:
      "Four practice areas delivering measurable business impact: AI Revenue Operations, Performance Improvement, PE Value Creation, and Custom AI Agents.",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
