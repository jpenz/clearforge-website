"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { images } from "@/lib/images";

const outcomes = [
  "Build a repeatable pipeline",
  "Improve operating efficiency",
  "Launch production AI systems faster",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-navy min-h-[85vh] flex items-center">
      {/* Generated background image */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${images.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-navy via-slate-navy/95 to-slate-navy/70" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <span className="section-label">For PE Operators and Mid-Market Leaders</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              <span className="gradient-text">Strategy that ships.</span>
              <br />
              AI that performs.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-300 max-w-2xl">
              ClearForge turns stalled initiatives into operating systems that produce measurable outcomes. No hand-wavy transformation programs. Execution that leaders can track.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/services/ai-marketing-agent">Explore AI Marketing Agent <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
                <Link href="/scorecard">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Take the AI Readiness Scorecard
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-light">What clients hire us to do</p>
            <div className="mt-5 space-y-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <p className="text-base font-medium text-slate-200">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-400">
              Flagship offer: <Link href="/services/ai-marketing-agent" className="text-teal hover:underline">AI Marketing Agent</Link> for companies that need a full marketing engine now.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <span className="text-sm text-slate-500 uppercase tracking-wider font-medium">Built for</span>
            {[
              "PE Operating Teams",
              "Portfolio Company CEOs",
              "CMOs Under Board Pressure",
              "Owner-Led Mid-Market Businesses",
            ].map((client) => (
              <span key={client} className="text-sm text-slate-400 font-medium">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
