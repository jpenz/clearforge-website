"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";

const outcomes = [
  "Build a repeatable pipeline",
  "Improve operating efficiency",
  "Launch production AI systems faster",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-120px] h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute -bottom-24 left-[-90px] h-80 w-80 rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-100 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <span className="section-label">For PE Operators and Mid-Market Leaders</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-navy sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              <span className="gradient-text">Strategy that ships.</span>
              <br />
              AI that performs.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl">
              ClearForge turns stalled initiatives into operating systems that produce measurable outcomes. No hand-wavy transformation programs. Execution that leaders can track.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/services/ai-marketing-agent">Explore AI Marketing Agent <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/scorecard">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Take the AI Readiness Scorecard
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/90 p-7 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">What clients hire us to do</p>
            <div className="mt-5 space-y-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                  <p className="text-base font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Flagship offer: AI Marketing Agent for companies that need a full marketing engine now.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <span className="text-sm text-slate-400 uppercase tracking-wider font-medium">Built for</span>
            {[
              "PE Operating Teams",
              "Portfolio Company CEOs",
              "CMOs Under Board Pressure",
              "Owner-Led Mid-Market Businesses",
            ].map((client) => (
              <span key={client} className="text-sm text-slate-500 font-medium">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
