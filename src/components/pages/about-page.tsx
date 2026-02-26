"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Results Over Activity",
    description:
      "Our benchmark is business impact, not slide count. If there is no KPI path, there is no project.",
  },
  {
    title: "Senior Operators Only",
    description:
      "The team that scopes the program is the team that builds and runs it. No junior handoff model.",
  },
  {
    title: "Transparent by Default",
    description:
      "Clear pricing, explicit milestones, and direct communication with operating leadership.",
  },
  {
    title: "Continuous Improvement",
    description:
      "Systems are designed to evolve monthly with market shifts, new data, and business priorities.",
  },
];

const approach = [
  {
    number: "01",
    title: "Business-First Diagnostics",
    description:
      "We start with growth constraints, margin pressure, and workflow bottlenecks before discussing tools.",
  },
  {
    number: "02",
    title: "Integrated Strategy + Build",
    description:
      "Consulting and engineering stay in one workstream, preserving context from decision to deployment.",
  },
  {
    number: "03",
    title: "Performance Operating Model",
    description:
      "Post-launch optimization is built into the program so outcomes improve instead of decaying.",
  },
];

export function AboutPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="section-label">About ClearForge</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              We built ClearForge to close the strategy-to-execution gap.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate">
              Most firms separate advisory and delivery. We combine both so CEO teams, PE operators, and
              owner-led businesses get strategy with shipping accountability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {approach.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="border border-fog bg-white p-6"
              >
                <p className="metric-display text-3xl">{item.number}</p>
                <h2 className="mt-3 text-2xl leading-tight text-midnight">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl text-midnight sm:text-5xl">Operating Principles</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="border border-fog bg-ivory p-6"
              >
                <h3 className="text-2xl text-midnight">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Who We Work With</span>
          <h2 className="mt-4 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
            Mid-market and lower-middle-market leaders who need measurable performance gains.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "CEO and COO Teams",
                body: "Mid-market leaders navigating growth, margin pressure, and operational complexity.",
              },
              {
                title: "PE Portfolio Teams",
                body: "Operating partners scaling value creation across multiple portfolio companies.",
              },
              {
                title: "Owner-Led Businesses Near Exit",
                body: "Often $2M-$15M seller earnings with 60-year-old owners preparing succession or sale.",
              },
            ].map((item) => (
              <article key={item.title} className="border border-white/12 bg-white/[0.04] p-6">
                <h3 className="text-2xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-center lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-midnight sm:text-5xl">Ready to discuss your operating priorities?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Start with a 30-minute discovery call. We&apos;ll tell you directly whether we can help and where AI
            can improve value before transition.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
