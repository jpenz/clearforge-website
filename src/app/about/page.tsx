import type { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: "About ClearForge — Our Story, Method & Values",
  description:
    "ClearForge bridges the gap between strategy and engineering. Learn about our founder, our four-phase methodology, and why we deliver results — not reports.",
  openGraph: {
    title: "About ClearForge — Our Story, Method & Values",
    description:
      "ClearForge bridges the gap between strategy and engineering. Learn about our founder, our four-phase methodology, and why we deliver results — not reports.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
