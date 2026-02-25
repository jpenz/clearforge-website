"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

export function ScorecardCTA() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-white text-teal">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold text-text sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            How ready is your business for AI?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Take our 5-minute AI Readiness Scorecard. 18 questions across 5 pillars.
            Get a personalized score with specific recommendations.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/scorecard">Take the AI Scorecard</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
