"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const values = [
  { title: "Outcomes Over Outputs", description: "We measure success by business impact, not deliverables. Every engagement ties to a KPI you care about." },
  { title: "Build, Don't Just Advise", description: "The people who scope your engagement are the ones who deliver it. No bait-and-switch with junior teams." },
  { title: "Compound Intelligence", description: "Our AI systems get smarter every month. Models retrain on real data. Intelligence compounds. The gap widens." },
  { title: "Radical Transparency", description: "Transparent pricing, honest assessments, and clear communication. If AI isn't the right answer, we'll tell you." },
];

const approach = [
  { number: "01", title: "Strategy Consulting Rigor", description: "We start with the business problem, not the technology. Deep diagnostics, stakeholder interviews, process mapping — the foundational work that separates successful AI from expensive experiments." },
  { number: "02", title: "Hands-On Engineering", description: "Same team, same engagement. The strategists who diagnose the problems are the engineers who build the solutions. No handoff, no gap, no loss of context." },
  { number: "03", title: "Continuous Optimization", description: "We don't build and leave. Our AI systems learn and improve monthly. Models retrained on real data. Performance improves every cycle. The system compounds in value." },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">About ClearForge</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              We close the gap between <span className="gradient-text">AI strategy and AI execution.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              ClearForge was founded on a simple observation: most AI initiatives fail not because the
              technology doesn&apos;t work, but because strategy and execution live in separate silos.
              We put them in the same team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">Our Approach</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Strategy meets engineering.
            </h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {approach.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="rounded-lg border border-gray-200 bg-white p-8"
              >
                <span className="metric-display text-2xl">{item.number}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{item.title}</h3>
                <p className="mt-3 text-lg text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">What We Believe</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Principles, not platitudes.
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-lg border border-gray-200 p-8"
              >
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{value.title}</h3>
                <p className="mt-3 text-lg text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label text-teal">Who We Work With</span>
            <h2 className="mt-4 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Mid-market operators who want measurable results.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "Mid-Market Companies", description: "$5M-$500M revenue companies looking to build competitive advantage through AI-driven operations." },
                { title: "PE Portfolio Companies", description: "Portfolio companies seeking AI-driven value creation — from 90-day sprints to portfolio-wide transformation." },
                { title: "Growth-Stage Firms", description: "Companies scaling fast that need systems built for performance, not just for show." },
              ].map((item, i) => (
                <div key={item.title} className="rounded-lg border border-charcoal bg-charcoal p-6">
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{item.title}</h3>
                  <p className="mt-2 text-lg text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let&apos;s talk about your business.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            30-minute discovery call. Honest assessment. No pressure.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
