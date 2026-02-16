"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pricingTiers, faqs } from "@/data/pricing";
import { Check, ArrowRight } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">Pricing</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Transparent pricing.<br /><span className="gradient-text">No surprises.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500">
              Two models: Build &amp; Transfer (you own the code) or Managed Services (we run it for you).
              Every engagement maps to measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingTiers.map((tier, i) => (
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
                  <span className="inline-flex self-start rounded-md bg-teal px-2.5 py-1 text-xs font-semibold text-white mb-4">Most Popular</span>
                )}
                {tier.badge && !tier.popular && (
                  <span className="inline-flex self-start rounded-md border border-teal/30 bg-teal/5 px-2.5 py-1 text-xs font-medium text-teal mb-4">{tier.badge}</span>
                )}
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="metric-display text-3xl">{tier.price}</span>
                  <span className="text-sm text-slate-500">{tier.period}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">{tier.timeline}</div>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed flex-grow">{tier.description}</p>
                <ul className="mt-6 space-y-2 border-t border-gray-200 pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
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
        </div>
      </section>

      {/* Build & Transfer vs Managed */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-label">Two Models</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>Build &amp; Transfer vs. Managed Services</h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>Build &amp; Transfer</h3>
                <p className="mt-2 text-sm text-slate-500">We build it. You own it. Full code, documentation, and IP transfer.</p>
                <ul className="mt-6 space-y-2">
                  {["Full code ownership", "Complete documentation", "Team training and handoff", "Your competitive advantage"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-slate-500 border-t border-gray-200 pt-4">Best for: Companies with technical teams who want to own and maintain AI systems.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>Managed Services</h3>
                <p className="mt-2 text-sm text-slate-500">We build it. We run it. You get the results without the overhead.</p>
                <ul className="mt-6 space-y-2">
                  {["No engineering team needed", "SLA-backed performance", "Continuous optimization", "Predictable monthly cost"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-slate-500 border-t border-gray-200 pt-4">Best for: Companies that want AI results without building an internal AI team.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
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
                  <Accordion.Content className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Still have questions?
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            30-minute discovery call. No pitch decks, no pressure.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
