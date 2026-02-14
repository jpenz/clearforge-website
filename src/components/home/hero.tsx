"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const metrics = [
  { value: "23%", label: "Avg. Cost Reduction" },
  { value: "90d", label: "Time to Impact" },
  { value: "$4.2M", label: "Avg. Value Created" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white">
      {/* Crosshatch pattern background */}
      <div className="absolute inset-0 crosshatch" />

      <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-24 lg:px-8 lg:pt-32">
        <div className="max-w-4xl">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            AI Performance Consulting
          </motion.p>

          <motion.h1
            className="mt-6 font-serif text-5xl text-forge-navy sm:text-6xl md:text-7xl lg:text-[72px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Strategy that ships.
            <br />
            <span className="text-molten-amber">AI that performs.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            We combine management consulting rigor with hands-on AI engineering
            to deliver measurable results&nbsp;&mdash; not just roadmaps.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/scorecard">
                Take AI Scorecard
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Metrics bar */}
      <motion.div
        className="relative mt-20 border-t border-border-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col divide-y divide-border-subtle px-6 sm:flex-row sm:divide-x sm:divide-y-0 lg:px-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex-1 py-6 sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <span className="metric-display text-3xl text-molten-amber lg:text-4xl">
                {metric.value}
              </span>
              <p className="mt-1 text-xs uppercase tracking-[1.5px] text-text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
