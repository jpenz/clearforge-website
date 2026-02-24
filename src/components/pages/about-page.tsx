"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const values = [
  { title: "Strategy Must End in Execution", description: "We do not stop at recommendations. Every strategy engagement is built to move into delivery." },
  { title: "Senior-Led Teams", description: "You work directly with experienced consultants and engineers, not a leverage model of junior handoffs." },
  { title: "Engineering Depth with Operating Discipline", description: "We build real systems, then manage them with clear metrics and accountable cadence." },
  { title: "Plainspoken, Board-Ready Communication", description: "We keep recommendations clear, practical, and grounded in measurable outcomes." },
];

const approach = [
  { number: "01", title: "Diagnose Where You Should Win", description: "We apply consulting-grade analysis to market position, operational bottlenecks, and AI opportunity sizing." },
  { number: "02", title: "Build the Systems That Matter", description: "Our engineering team translates strategy into production AI workflows tied to core business metrics." },
  { number: "03", title: "Operate and Improve Continuously", description: "We run and optimize the systems so value compounds instead of decaying after launch." },
];

export function AboutPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">About ClearForge</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Strategy consulting discipline with AI engineering and managed operations.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              ClearForge was built for leaders who need more than recommendations. Our team combines management
              consulting rigor with hands-on delivery so strategy turns into live systems that perform in production.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">Our Approach</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Diagnose. Build. Operate.
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
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">What We Believe</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Principles that keep delivery accountable.
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
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label text-teal">Who We Work With</span>
            <h2 className="mt-4 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Teams that need strategy and execution from the same partner.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "PE Operating Partners", description: "Value-creation teams driving performance across portfolio companies." },
                { title: "Business Owners and CEOs", description: "Leaders who need AI outcomes without building an internal AI department." },
                { title: "Revenue and Functional Leaders", description: "Operators responsible for growth, efficiency, and measurable execution." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-charcoal bg-charcoal p-6">
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{item.title}</h3>
                  <p className="mt-2 text-lg text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let&apos;s discuss your priorities.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            30-minute discovery call with practical recommendations and clear next steps.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
