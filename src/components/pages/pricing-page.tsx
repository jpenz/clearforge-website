"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { pricingTiers, faqs } from "@/data/pricing";
import { Check, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

const coreLifecycleTiers = pricingTiers.filter((tier) => tier.category === "strategy-build-operate");
const marketingApplicationTiers = pricingTiers.filter((tier) => tier.category === "marketing-revenue-ops");

export function PricingPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">Pricing</span>
            <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
              Pricing for a strategy-to-operations AI partnership.
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              Start with Growth Strategy & Diagnosis, move into build, and run systems through Managed AI Operations.
              AI Marketing & Revenue Operations is one application with tiered scope.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">Core Lifecycle</span>
            <h2 className="mt-3 text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
              Strategy, Build, and Managed Operations
            </h2>
            <p className="mt-3 text-lg text-text-secondary">
              The primary ClearForge model for turning AI potential into measurable business value.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {coreLifecycleTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`rounded-lg border bg-white p-8 ${tier.popular ? "border-teal ring-1 ring-teal" : "border-border"}`}
              >
                {tier.badge && (
                  <span className="mb-4 inline-flex rounded-md border border-teal/30 bg-teal/5 px-2.5 py-1 text-xs font-medium text-teal">
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="metric-display text-2xl">{tier.price}</span>
                  <span className="text-base text-text-secondary">{tier.period}</span>
                  <span className="text-base text-text-tertiary">· {tier.timeline}</span>
                </div>
                <p className="mt-4 text-base text-text-secondary">{tier.description}</p>
                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-base text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="section-label">Application Pricing</span>
            <h2 className="mt-3 text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
              AI Marketing & Revenue Operations Tiers
            </h2>
            <p className="mt-3 text-lg text-text-secondary">
              A specific application of Managed AI Operations for full-cycle growth and pipeline execution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {marketingApplicationTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`flex flex-col rounded-lg border bg-white p-8 ${tier.popular ? "border-teal ring-1 ring-teal" : "border-border"}`}
              >
                {tier.popular && (
                  <span className="mb-4 inline-flex self-start rounded-md bg-teal px-2.5 py-1 text-xs font-semibold text-white">Most Selected</span>
                )}
                {tier.badge && !tier.popular && (
                  <span className="mb-4 inline-flex self-start rounded-md border border-teal/30 bg-teal/5 px-2.5 py-1 text-xs font-medium text-teal">{tier.badge}</span>
                )}
                <h3 className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="metric-display text-3xl">{tier.price}</span>
                  <span className="text-lg text-text-secondary">{tier.period}</span>
                </div>
                <div className="mt-1 text-base text-text-tertiary">{tier.timeline}</div>
                <p className="mt-4 flex-grow text-base leading-relaxed text-text-secondary">{tier.description}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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

          <div className="mt-8 rounded-lg border border-teal/20 bg-teal/5 p-6 text-base text-text-secondary">
            Managed engagements are scoped around outcomes and reviewed continuously with leadership.
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="mb-8 text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Frequently Asked Questions</h2>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={`item-${i}`} className="overflow-hidden rounded-lg border border-border bg-white">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-text transition-colors hover:text-teal">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 text-text-tertiary transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-5 pb-5 text-base leading-relaxed text-text-secondary">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Need help choosing the right starting point?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            We can map your best Strategy to Operations path in a focused discovery call.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
