"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const results = [
  { metric: "1,060", label: "Qualified opportunities" },
  { metric: "10", label: "Verticals mapped" },
  { metric: "5", label: "New high-growth segments" },
  { metric: "16", label: "Divisions ranked" },
  { metric: "60%+", label: "Prospecting time reduction" },
  { metric: "Monthly", label: "Strategy refresh cycle" },
];

export function CaseStudyPreview() {
  return (
    <section className="bg-midnight py-24 lg:py-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Featured Engagement</span>
            <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">
              Fortune 1000 manufacturer transformed sales intelligence at portfolio scale.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              A multi-division industrial group adopted a unified AI operating model across sales and market
              intelligence, turning fragmented prospecting into one continuously improving revenue engine.
            </p>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/case-studies/industrial-manufacturer">
                Read the full case study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="grid grid-cols-2 border border-white/15"
          >
            {results.map((result) => (
              <div key={result.label} className="border border-white/10 bg-white/[0.03] p-5">
                <p className="metric-display text-3xl">{result.metric}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">{result.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
