"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const proofPoints = [
  { metric: "1,060", label: "Qualified opportunities identified" },
  { metric: "16", label: "Business divisions analyzed" },
  { metric: "60%", label: "Manual prospecting time reduced" },
];

const capabilities = [
  "AI strategy and market intelligence",
  "Custom AI systems built for production",
  "Succession-ready operating systems for owner-led teams",
];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-18 lg:grid-cols-[1.25fr_0.95fr] lg:px-8 lg:pb-18 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label">For CEOs, PE Operators, and Owner-Led Teams</span>
          <h1 className="mt-5 max-w-3xl text-[2.55rem] leading-[1.06] text-midnight sm:text-6xl">
            Strategy that ships.
            <br />
            <span className="text-brass">AI that performs.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate">
            We help CEOs, PE operating partners, and owner-led companies in the mid-market and lower middle
            market turn AI from slideware into measurable operating performance. That includes businesses with
            $2M-$15M in seller earnings and 60-year-old owners preparing for transition.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/scorecard">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Run the AI Scorecard
              </Link>
            </Button>
          </div>

          <ul className="mt-9 grid max-w-2xl gap-3 border-t border-fog pt-5 sm:grid-cols-3">
            {capabilities.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-stone">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="border border-fog bg-ivory"
        >
          <div className="border-b border-fog px-6 py-5">
            <p className="section-label">Recent Client Outcomes</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Snapshot from a Fortune 1000 industrial engagement.
            </p>
          </div>

          <div className="divide-y divide-fog">
            {proofPoints.map((point) => (
              <div key={point.label} className="px-6 py-6">
                <p className="metric-display text-4xl text-midnight">{point.metric}</p>
                <p className="mt-1 text-sm text-stone">{point.label}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-fog bg-white px-6 py-5">
            <p className="text-xs uppercase tracking-[0.14em] text-stone">Engagement Focus</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Revenue operations, market intelligence, and workflow automation tied directly to KPI lift.
            </p>
          </div>
        </motion.aside>
      </div>

      <div className="border-y border-fog bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-stone">
            Trusted by Mid-Market CEOs, PE Operating Teams, and Owner-Led Businesses Preparing for Exit
          </p>
        </div>
      </div>
    </section>
  );
}
