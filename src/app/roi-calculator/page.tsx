import type { Metadata } from "next";
import { ROICalculatorPageClient } from "@/components/pages/roi-calculator-page";

export const metadata: Metadata = {
  title: "AI ROI Calculator — Estimate Your Implementation Value",
  description:
    "Calculate the potential annual value of AI implementation for your business. Get estimates for labor savings, error reduction, and productivity gains.",
  openGraph: {
    title: "AI ROI Calculator — Estimate Your Implementation Value",
    description:
      "Calculate the potential annual value of AI implementation for your business. Get estimates for labor savings, error reduction, and productivity gains.",
  },
};

export default function ROICalculatorPage() {
  return <ROICalculatorPageClient />;
}
