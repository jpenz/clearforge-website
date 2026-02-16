"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "1,060", label: "Qualified Opportunities" },
  { value: "16", label: "Divisions Analyzed" },
  { value: "45 min", label: "82-Page Report Time" },
  { value: "5", label: "New Market Segments" },
  { value: "60%+", label: "Prospecting Time Saved" },
  { value: "21.9%", label: "CAGR — Top Segment" },
];

export function CaseStudyPreview() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-teal">Featured Case Study</span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Fortune 1000 Manufacturer Transforms Sales Intelligence
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              A $2B+ industrial manufacturer with 70+ facilities deployed AI-powered sales
              intelligence across 16 divisions — discovering 5 new high-growth market segments
              and reducing manual prospecting time by 60%.
            </p>
            <Button className="mt-8" asChild>
              <Link href="/case-studies/industrial-manufacturer">
                Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-lg border border-charcoal bg-charcoal p-5"
              >
                <div className="metric-display text-2xl">{stat.value}</div>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
