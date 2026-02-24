"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/data/pricing";
import { ArrowRight, Check, Gauge, LineChart, Radar, Repeat, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Repeat,
    title: "Always-On Campaign Operations",
    description: "Awareness, conversion, and retention motions run continuously across channels.",
  },
  {
    icon: Radar,
    title: "Lead Intelligence + Prioritization",
    description: "Prospects are identified, qualified, and routed with clear follow-up paths.",
  },
  {
    icon: Gauge,
    title: "Real-Time Leadership Visibility",
    description: "Performance dashboards are live and tied to growth and pipeline outcomes.",
  },
  {
    icon: Sparkles,
    title: "Continuous Optimization",
    description: "Campaign strategy and execution are refined weekly, not quarterly.",
  },
];

const differentiators = [
  "AI-driven operating cadence runs 24/7 instead of weekly check-ins",
  "Playbooks are updated continuously as performance data changes",
  "Month-to-month after an initial 90-day ramp",
  "One operating model across paid, organic, content, and outreach",
  "Designed for buyers who need results without building a full internal team",
];

const marketingTiers = pricingTiers.filter((tier) => tier.category === "marketing-agent");

export function AiMarketingAgentPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 right-[-120px] h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
          <div className="absolute -bottom-20 left-[-90px] h-80 w-80 rounded-full bg-cyan/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl">
            <span className="section-label">Flagship Service</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              AI Marketing Agent
            </h1>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              A complete marketing operating system for PE-backed and mid-market companies that need predictable pipeline growth. Strategy, execution, and optimization in one monthly engagement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Book a Discovery Call</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View Tiers <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 lg:py-32 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                <item.icon className="h-6 w-6 text-teal" />
                <h2 className="mt-4 text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {item.title}
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Tiered scope based on service coverage
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {marketingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`rounded-lg border bg-white p-7 ${tier.popular ? "border-teal ring-1 ring-teal" : "border-gray-200"}`}
              >
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="metric-display text-2xl">{tier.price}</span>
                  <span className="text-base text-slate-600">{tier.period}</span>
                </div>
                <p className="mt-3 text-base text-slate-600">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="section-label text-teal">Why Teams Switch</span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Better economics than fragmented agency stacks
              </h2>
              <p className="mt-4 text-lg text-slate-200">
                The AI Marketing Agent replaces disconnected vendors with one accountable growth system.
              </p>
            </div>
            <div className="space-y-3">
              {differentiators.map((item) => (
                <div key={item} className="rounded-lg border border-charcoal bg-charcoal p-5 text-base text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Proof in-market: Metro Detroit Services Company
            </h3>
            <p className="mt-3 text-base text-slate-200 leading-relaxed">
              A legacy services business with no formal marketing program moved from attrition to active growth after launching a complete website, local presence, outreach workflows, and recurring contract motion.
            </p>
            <Button className="mt-5" variant="outline" asChild>
              <Link href="/case-studies/metro-detroit-services-company">Read Case Study <LineChart className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Want a marketing system that compounds each month?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We can scope the right tier in one working session.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
