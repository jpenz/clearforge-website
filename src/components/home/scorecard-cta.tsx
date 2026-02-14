"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScorecardCTA() {
  return (
    <section className="border-t border-border-subtle bg-forge-navy py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
              Free Assessment
            </p>
            <h2 className="mt-4 font-serif text-3xl text-warm-white sm:text-4xl lg:text-5xl">
              How AI-Ready Is Your Business?
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-white/70">
              Take our free 5-minute assessment and get a personalized AI
              readiness score with actionable recommendations.
            </p>
            <div className="mt-10">
              <Button size="xl" asChild>
                <Link href="/scorecard">
                  Take the Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-warm-white/10">
            {[
              { value: "18", label: "Questions" },
              { value: "5 min", label: "Duration" },
              { value: "Instant", label: "Results" },
            ].map((item) => (
              <div key={item.label} className="py-6">
                <span className="metric-display text-3xl text-molten-amber">
                  {item.value}
                </span>
                <p className="mt-1 text-xs uppercase tracking-[1.5px] text-warm-white/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
