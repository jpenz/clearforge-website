"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const values = [
  { title: "Outcomes Over Activity", description: "We measure success by operational and growth impact, not by hours billed or decks delivered." },
  { title: "Senior Team, Direct Delivery", description: "The team that scopes your work is the team that ships it. No handoff to junior execution." },
  { title: "Systems That Compound", description: "We build operating systems designed to improve with usage, not static projects that decay after launch." },
  { title: "Plainspoken Communication", description: "Clear scope, clear tradeoffs, and clear accountability at every step." },
];

const approach = [
  { number: "01", title: "Operator-Level Diagnosis", description: "We start with the commercial and operational bottlenecks that matter to owners, CEOs, and operating partners." },
  { number: "02", title: "Strategy + Engineering in One Team", description: "Our background combines top-tier consulting rigor with implementation depth so plans become operating systems." },
  { number: "03", title: "Continuous Performance Management", description: "Delivery does not stop at launch. We maintain a cadence of optimization, measurement, and iteration." },
];

export function AboutPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">About ClearForge</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Consulting discipline with builder execution.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              ClearForge combines management consulting backgrounds from firms such as Bain, EY, and Capgemini with hands-on AI engineering. We are built for leaders who need real operating progress, not slideware.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">Our Approach</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Diagnose. Build. Improve.
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

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <span className="section-label">What We Believe</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Principles that keep delivery honest.
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

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label text-teal">Who We Work With</span>
            <h2 className="mt-4 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Operators with high expectations and tight timelines.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "PE Operating Partners", description: "Teams driving post-acquisition value creation across portfolio companies." },
                { title: "Portfolio Company Leadership", description: "CEOs and functional leaders who need immediate execution support." },
                { title: "Owner-Led Mid-Market Firms", description: "Businesses scaling from founder-led growth into repeatable systems." },
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let&apos;s discuss your priorities.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            30-minute discovery call with practical recommendations and no hard sell.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
