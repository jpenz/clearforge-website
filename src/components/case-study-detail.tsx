"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forge-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-warm-white/50 hover:text-warm-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>

            <div className="mt-8 flex gap-3">
              <span className="bg-warm-white/10 px-3 py-1 text-xs uppercase tracking-[1.5px] text-warm-white/70">
                {cs.industry}
              </span>
              <span className="bg-warm-white/10 px-3 py-1 text-xs uppercase tracking-[1.5px] text-warm-white/70">
                {cs.service}
              </span>
            </div>

            <h1 className="mt-8 max-w-4xl font-serif text-4xl text-warm-white sm:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-6 max-w-2xl text-warm-white/70">{cs.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            The Challenge
          </p>
          <p className="mt-6 text-text-secondary leading-relaxed">
            {cs.challenge}
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="border-y border-border-subtle bg-canvas py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            The Solution
          </p>
          <div className="mt-8 space-y-4">
            {cs.solution.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-molten-amber" />
                <p className="text-text-secondary">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Results
          </p>
          <div className="mt-12 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
            {cs.outcomes.map((o) => (
              <div key={o.metric} className="bg-warm-white p-8">
                <span className="metric-display text-3xl text-molten-amber">
                  {o.metric}
                </span>
                <p className="mt-2 text-sm text-text-secondary">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="border-t border-border-subtle bg-canvas py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            What Happened Next
          </p>
          <p className="mt-6 text-text-secondary leading-relaxed">{cs.scale}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forge-navy py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl text-warm-white sm:text-4xl">
            Ready for results like these?
          </h2>
          <Button size="xl" className="mt-8" asChild>
            <Link href="/contact">
              Book Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
