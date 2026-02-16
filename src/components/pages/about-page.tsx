"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Results over activity",
    description:
      "We measure success by business outcomes, not hours billed or slides delivered. Every engagement has measurable KPIs from day one.",
  },
  {
    title: "Build, don't just advise",
    description:
      "We don't hand you a roadmap and walk away. The same team that designs your strategy builds and deploys the solution.",
  },
  {
    title: "Continuous > one-time",
    description:
      "AI systems that stop learning start dying. We build for continuous optimization because that's where the real value compounds.",
  },
  {
    title: "Radical transparency",
    description:
      "Transparent pricing, clear deliverables, honest assessments. If AI isn't the right answer for you, we'll tell you.",
  },
  {
    title: "Senior operators only",
    description:
      "No bait-and-switch. The people you meet in the discovery call are the people who do the work. Period.",
  },
  {
    title: "Your IP, your systems",
    description:
      "Everything we build is yours to keep. Full documentation, knowledge transfer, and no vendor lock-in.",
  },
];

const approach = [
  {
    number: "01",
    title: "Management consulting rigor",
    description:
      "We start with the business problem, not the technology. Stakeholder interviews, process mapping, data audits, and opportunity sizing — the same methodology used by top-tier firms.",
  },
  {
    number: "02",
    title: "AI engineering execution",
    description:
      "Then we build. Custom AI agents, workflow automation, data pipelines, and analytics dashboards — deployed into your production environment in weeks, not quarters.",
  },
  {
    number: "03",
    title: "Continuous optimization",
    description:
      "Our AI systems get smarter every month. Monthly retraining on conversion data, new market signals, and performance metrics. The gap between month one and month six is exponential.",
  },
];

export function AboutPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            About ClearForge
          </p>
          <h1 className="mt-6 font-serif text-4xl text-forge-navy sm:text-5xl lg:text-6xl">
            The firm that builds
            <br />
            what it recommends
          </h1>
          <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
            ClearForge combines management consulting rigor with hands-on AI
            engineering. We exist because too many companies have shelves full of
            strategy decks and nothing in production.
          </p>
        </motion.div>

        {/* Our Approach */}
        <div className="mt-24">
          <motion.h2
            className="font-serif text-3xl text-forge-navy"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            Our approach
          </motion.h2>
          <div className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
            {approach.map((a, i) => (
              <motion.div
                key={a.number}
                className="grid gap-6 py-10 lg:grid-cols-[auto_1fr_2fr] lg:items-start"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className="metric-display text-sm text-molten-amber">
                  {a.number}
                </span>
                <h3 className="font-serif text-xl text-forge-navy">
                  {a.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {a.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <motion.h2
            className="font-serif text-3xl text-forge-navy"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            What we believe
          </motion.h2>
          <div className="mt-12 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-warm-white p-8 lg:p-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <h3 className="font-serif text-lg text-forge-navy">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <motion.div
          className="mt-24 bg-forge-navy p-10 sm:p-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            The Team
          </p>
          <h2 className="mt-6 font-serif text-3xl text-warm-white">
            Operators, not advisors
          </h2>
          <p className="mt-4 max-w-2xl text-warm-white/60 leading-relaxed">
            Our team combines backgrounds in top-tier management consulting with
            deep AI engineering expertise. We&apos;ve built and deployed AI
            solutions for Fortune 1000 companies, PE portfolio companies, and
            high-growth firms. We don&apos;t just know what to do — we know how
            to build it.
          </p>
          <div className="mt-10 grid gap-px bg-deep-steel sm:grid-cols-3">
            {[
              { metric: "50+", label: "AI Solutions Deployed" },
              { metric: "10+", label: "Years Combined Experience" },
              { metric: "100%", label: "Senior Delivery Team" },
            ].map((m) => (
              <div key={m.label} className="bg-forge-navy p-6 text-center">
                <span className="metric-display text-2xl text-molten-amber">
                  {m.metric}
                </span>
                <p className="mt-1 text-xs uppercase tracking-[1.5px] text-warm-white/50">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-serif text-3xl text-forge-navy sm:text-4xl">
            Let&apos;s build something that works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            30 minutes. No pitch decks. Just a straightforward conversation.
          </p>
          <Button size="xl" className="mt-8" asChild>
            <Link href="/contact">
              Book Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
