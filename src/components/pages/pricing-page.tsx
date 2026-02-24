"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pricingTiers, faqs } from "@/data/pricing";
import { Check } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const marketingTiers = pricingTiers.filter((tier) => tier.category === "marketing-agent");
const coreServiceTiers = pricingTiers.filter((tier) => tier.category === "core-services");

export function PricingPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">Pricing</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Pricing built for execution, not procurement theater.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              The AI Marketing Agent is our flagship offer, tiered by scope of services. Core AI strategy and build services remain available for specific transformation needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">Flagship Service</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              AI Marketing Agent Tiers
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Scope-based retainers that cover strategy, execution, and optimization.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {marketingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`rounded-lg border bg-white p-8 flex flex-col ${
                  tier.popular ? "border-teal ring-1 ring-teal" : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <span className="inline-flex self-start rounded-md bg-teal px-2.5 py-1 text-xs font-semibold text-white mb-4">Most Selected</span>
                )}
                {tier.badge && !tier.popular && (
                  <span className="inline-flex self-start rounded-md border border-teal/30 bg-teal/5 px-2.5 py-1 text-xs font-medium text-teal mb-4">{tier.badge}</span>
                )}
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="metric-display text-3xl">{tier.price}</span>
                  <span className="text-lg text-slate-600">{tier.period}</span>
                </div>
                <div className="mt-1 text-base text-slate-500">{tier.timeline}</div>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed flex-grow">{tier.description}</p>
                <ul className="mt-6 space-y-2 border-t border-gray-200 pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-base text-slate-700">
                      <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant={tier.popular ? "default" : "outline"} asChild>
                  <Link href="/contact">{tier.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-teal/20 bg-teal/5 p-6 text-base text-slate-700">
            Engagement terms: 90-day ramp, then month-to-month. No long annual lock-ins.
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">Core Services</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Strategy, Build, and Operating Models
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {coreServiceTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-lg border border-gray-200 bg-white p-8"
              >
                {tier.badge && (
                  <span className="inline-flex rounded-md border border-teal/30 bg-teal/5 px-2.5 py-1 text-xs font-medium text-teal mb-4">{tier.badge}</span>
                )}
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="metric-display text-2xl">{tier.price}</span>
                  <span className="text-base text-slate-600">{tier.period}</span>
                  <span className="text-base text-slate-500">· {tier.timeline}</span>
                </div>
                <p className="mt-4 text-base text-slate-600">{tier.description}</p>
                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-base text-slate-700">
                      <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold text-slate-navy mb-8" style={{ fontFamily: "var(--font-space-grotesk)" }}>Frequently Asked Questions</h2>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={`item-${i}`} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-slate-navy hover:text-teal transition-colors group">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-5 pb-5 text-lg text-slate-600 leading-relaxed">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Want a scope recommendation?
          </h2>
          <p className="mt-4 text-lg text-slate-200 max-w-xl mx-auto">
            We can map the right tier and service mix in a 30-minute discovery call.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
