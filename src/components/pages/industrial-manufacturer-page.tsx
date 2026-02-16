"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <span ref={ref} className="metric-display text-4xl text-molten-amber lg:text-5xl">
      {val}{suffix}
    </span>
  );
}

const outcomes = [
  { end: 358, suffix: "", label: "Qualified acquisition & prospect targets identified in first market sweep" },
  { end: 10, suffix: "", label: "Industry verticals analyzed with full competitive landscapes" },
  { end: 45, suffix: " min", label: "To generate an 82-page strategic market study" },
  { end: 5, suffix: "", label: "New high-growth market segments discovered" },
  { end: 60, suffix: "%+", label: "Reduction in manual prospecting time" },
  { end: 16, suffix: "", label: "Business divisions ranked by growth potential" },
];

const solutions = [
  "AI-powered sales intelligence platform built on n8n workflow automation, orchestrating data across all 16 divisions simultaneously",
  "State-by-state automated prospect research pipelines identifying and qualifying targets across every division's addressable market",
  "Contact enrichment pipeline using a waterfall approach across multiple data sources for high match rates and accurate decision-maker contacts",
  "Monthly market intelligence reports — Bain/McKinsey caliber — generated in under 45 minutes, covering competitive landscapes, sizing, and growth trends",
  "Portfolio strategy analysis ranking all 16 divisions by CAGR, TAM, and margin potential for data-driven capital allocation",
  "Geographic expansion modeling identifying optimal new territories based on infrastructure spending, regulatory tailwinds, and competitive density",
];

const continuous = [
  "AI agents retrained monthly on conversion data — learning which prospects engage, which messaging resonates, which signals predict closed deals",
  "Market reports auto-refresh with emerging trends: infrastructure spending shifts, regulatory changes, construction activity, competitor moves",
  "New market segments and territories added automatically as data reveals opportunities the client hadn't previously considered",
  "Sales teams receive pre-qualified, enriched leads directly in their workflow — eliminating the gap between intelligence and action",
];

export function IndustrialManufacturerClient() {
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
              className="inline-flex items-center gap-2 text-sm text-warm-white/50 transition-colors hover:text-warm-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bg-warm-white/10 px-3 py-1 text-xs uppercase tracking-[1.5px] text-warm-white/70">
                Industrial Manufacturing
              </span>
              <span className="bg-warm-white/10 px-3 py-1 text-xs uppercase tracking-[1.5px] text-warm-white/70">
                AI Revenue Operations
              </span>
            </div>

            <h1 className="mt-8 max-w-4xl font-serif text-4xl text-warm-white sm:text-5xl lg:text-6xl">
              Fortune 1000 Industrial Manufacturer Transforms Sales Intelligence
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-warm-white/70 leading-relaxed">
              A $2B+ manufacturer with 70+ facilities and 16 business divisions
              deployed AI-powered sales intelligence to discover new markets,
              enrich contacts, and deliver strategic intelligence at consulting-firm
              speed.
            </p>
          </motion.div>

          {/* Hero metrics */}
          <motion.div
            className="mt-16 grid grid-cols-2 gap-px bg-deep-steel sm:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {[
              { label: "$2B+", sub: "Revenue" },
              { label: "70+", sub: "Facilities" },
              { label: "16", sub: "Business Divisions" },
            ].map((m) => (
              <div key={m.sub} className="bg-forge-navy p-8 text-center">
                <span className="metric-display text-3xl text-molten-amber">
                  {m.label}
                </span>
                <p className="mt-1 text-xs uppercase tracking-[1.5px] text-warm-white/50">
                  {m.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
                The Challenge
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h2 className="font-serif text-3xl text-forge-navy">
                Sales teams across 16 divisions working in silos
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                Sales teams across divisions operated in silos with no shared market
                intelligence, targeting prospects based on gut feel rather than data.
                Each division ran its own prospecting process — duplicating effort,
                missing cross-sell opportunities, and wasting senior sales talent on
                manual research.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Leadership had no unified view of which markets, geographies, or
                verticals offered the highest growth potential across their portfolio
                of businesses. Capital allocation decisions were made on instinct, not
                intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-y border-border-subtle bg-canvas py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              The ClearForge Solution
            </p>
            <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl">
              AI-powered sales intelligence at portfolio scale
            </h2>
          </motion.div>

          <div className="mt-12 space-y-4">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 border-b border-border-subtle pb-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-molten-amber" />
                <p className="text-text-secondary leading-relaxed">{s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Optimization */}
      <section className="bg-forge-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              The ClearForge Difference
            </p>
            <h2 className="mt-6 font-serif text-3xl text-warm-white sm:text-4xl">
              AI agents that learn, adapt, and compound
            </h2>
            <p className="mt-4 text-warm-white/60">
              Most consultancies build something and leave. Our agents get
              smarter every month.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-px bg-deep-steel sm:grid-cols-2">
            {continuous.map((c, i) => (
              <motion.div
                key={i}
                className="bg-forge-navy p-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <span className="metric-display text-sm text-molten-amber">
                  0{i + 1}
                </span>
                <p className="mt-3 text-sm text-warm-white/70 leading-relaxed">
                  {c}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              Results
            </p>
            <h2 className="mt-6 font-serif text-3xl text-forge-navy sm:text-4xl">
              Measurable impact, delivered
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o) => (
              <motion.div
                key={o.label}
                className="bg-warm-white p-8 lg:p-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
              >
                <AnimatedNumber end={o.end} suffix={o.suffix} />
                <p className="mt-3 text-sm text-text-secondary">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="border-t border-border-subtle bg-canvas py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
                What Happened Next
              </p>
              <h2 className="mt-6 font-serif text-3xl text-forge-navy">
                From initiative to strategic platform
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                What began as a sales intelligence initiative for two divisions has
                expanded into a company-wide strategic platform. The AI agents now run
                continuous market monitoring across all 16 divisions, automatically
                surfacing new opportunities as market conditions shift.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Leadership uses the portfolio analysis to inform M&A strategy, capital
                allocation, and geographic expansion decisions. The system compounds —
                each month of data makes the intelligence sharper, the targeting more
                precise, and the recommendations more valuable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forge-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-serif text-3xl text-warm-white sm:text-4xl">
              Ready for results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-warm-white/60">
              Book a 30-minute discovery call to explore how AI-powered
              intelligence could transform your business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/contact">
                  Book Discovery Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-warm-white/20 text-warm-white hover:bg-warm-white hover:text-forge-navy"
                asChild
              >
                <Link href="/case-studies">More Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
