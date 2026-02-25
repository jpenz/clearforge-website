"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/data/pricing";
import { ArrowRight, Check, Gauge, LineChart, Radar, Repeat, Sparkles } from "lucide-react";
import { images } from "@/lib/images";

const highlights = [
  {
    icon: Repeat,
    title: "One Application of Managed AI Operations",
    description: "This service applies the ClearForge platform specifically to your demand generation and revenue workflows.",
  },
  {
    icon: Radar,
    title: "Full-Cycle Revenue Visibility",
    description: "From channel execution to qualified pipeline, performance is measured in one operating model.",
  },
  {
    icon: Gauge,
    title: "Continuous Optimization",
    description: "Campaigns, workflows, and handoffs are tuned every week based on live results.",
  },
  {
    icon: Sparkles,
    title: "Integrated with Strategy",
    description: "Revenue operations are aligned to the growth priorities identified in your broader strategy work.",
  },
];

const differentiators = [
  "Unifies SEO, paid media, outreach, CRM, and pipeline workflows",
  "Replaces fragmented agency and freelancer stacks with one system",
  "Operates with the same senior team model used across all ClearForge services",
  "Runs month-to-month after initial setup periods",
  "Built to compound over time, not reset every quarter",
];

const marketingTiers = pricingTiers.filter((tier) => tier.category === "marketing-revenue-ops");

export function AiMarketingAgentPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-navy py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${images.aiMarketingAgent})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl">
            <span className="section-label">Service Application</span>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
              AI Marketing & Revenue Operations
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/70">
              A specific application of ClearForge&apos;s Strategy to Build to Operate platform. We run a complete revenue
              system spanning demand generation, outreach, CRM workflows, and pipeline management.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Book a Discovery Call</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-text" asChild>
                <Link href="/services">
                  View All Service Lines <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-xl border border-border bg-white p-8"
              >
                <item.icon className="h-6 w-6 text-teal" />
                <h2 className="mt-4 text-xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">Pricing Tiers</span>
            <h2 className="mt-3 text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
              Scope based on coverage and operating complexity
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
                className={`rounded-lg border bg-white p-7 ${tier.popular ? "border-teal ring-1 ring-teal" : "border-border"}`}
              >
                <h3 className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="metric-display text-2xl">{tier.price}</span>
                  <span className="text-base text-text-secondary">{tier.period}</span>
                </div>
                <p className="mt-3 text-base text-text-secondary">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="section-label text-teal">What This Looks Like In Market</span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                One accountable revenue system instead of fragmented vendors
              </h2>
              <p className="mt-4 text-lg text-white/80">
                This application shows how ClearForge takes strategy and turns it into daily operational execution.
              </p>
            </div>
            <div className="space-y-3">
              {differentiators.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-navy-surface p-5 text-base text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Proof in market: Metro Detroit Services Company
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              A legacy services business moved from no formal marketing infrastructure to recurring contracts and stronger
              acquisition readiness after deploying this revenue operations application.
            </p>
            <Button className="mt-5 border-white/20 text-white hover:bg-white hover:text-text" variant="outline" asChild>
              <Link href="/case-studies/metro-detroit-services-company">
                Read Case Study <LineChart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
            Want to apply the platform to your revenue engine?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">We can scope the right tier in one working session.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
