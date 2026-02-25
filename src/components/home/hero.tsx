"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { images } from "@/lib/images";

const proofPoints = [
  "Fortune 1000 industrial manufacturer",
  "PE portfolio companies",
  "Legacy businesses modernized for AI",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-slate-navy grain-overlay gradient-mesh">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${images.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-navy via-slate-navy/95 to-slate-navy/70" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <span className="section-label">For PE Operators, CEOs, and Revenue Leaders</span>
            <h1
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Most companies know AI should be driving more value.
              <br />
              <span className="gradient-text">The gap is execution.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-300">
              AI agents are becoming part of the workforce. The companies pulling ahead aren't just buying technology —
              they're rewiring how their business operates. ClearForge tells you where to focus, deploys the agents,
              and runs them alongside your team.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/services">
                  See How We Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-400 text-white hover:bg-white hover:text-slate-navy"
                asChild
              >
                <Link href="/scorecard">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Take the AI Readiness Scorecard
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-light">How ClearForge closes the gap</p>
            <div className="mt-5 space-y-3">
              {[
                "Diagnose where your business should be winning",
                "Deploy AI agents that operate as part of your team",
                "Run and optimize those systems continuously",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <p className="text-base font-medium text-slate-200">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-400">Recent applications</p>
            <ul className="mt-2 space-y-1">
              {proofPoints.map((point) => (
                <li key={point} className="text-sm text-slate-300">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
