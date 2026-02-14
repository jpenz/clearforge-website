import type { Metadata } from "next";
import { CaseStudiesPageClient } from "@/components/pages/case-studies-page";

export const metadata: Metadata = {
  title: "Case Studies — Real AI Results, Verified Outcomes",
  description:
    "See how ClearForge delivers measurable results: 30% pipeline increases, 10% EBITDA improvement, $240K annual savings, and 3.5x conversion lifts.",
  openGraph: {
    title: "Case Studies — Real AI Results, Verified Outcomes",
    description:
      "See how ClearForge delivers measurable results: 30% pipeline increases, 10% EBITDA improvement, $240K annual savings, and 3.5x conversion lifts.",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
