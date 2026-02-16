"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const metrics = [
  { value: "1,060", label: "Opportunities Identified" },
  { value: "97.5%", label: "Data Accuracy" },
  { value: "45 min", label: "82-Page Report Generation" },
  { value: "21.9%", label: "CAGR — Data Center Cooling" },
];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-0 lg:px-8 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-label">AI Performance Consulting</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-navy sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            <span className="gradient-text">Strategy that ships.</span>
            <br />
            AI that performs.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-2xl">
            We combine strategy consulting rigor with hands-on AI engineering to deliver
            measurable results for mid-market companies and PE portfolio companies.
            No decks. No demos. Working systems that drive revenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies/industrial-manufacturer">See Our Results</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-lg">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
              className={`p-6 lg:p-8 text-center ${i < metrics.length - 1 ? "border-r border-gray-200" : ""} ${i < 2 ? "border-b border-gray-200 lg:border-b-0" : ""}`}
            >
              <div className="metric-display text-3xl lg:text-4xl">{metric.value}</div>
              <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
