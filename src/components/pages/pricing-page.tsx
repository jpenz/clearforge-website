"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers, faqs } from "@/data/pricing";

export function PricingPage() {
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
            <span className="section-label">Pricing</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              Transparent commercial models built for operators.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate">
              Structured for CEO teams, PE operating groups, and owner-led companies deciding between ownership
              transfer and fully managed execution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricingTiers.map((tier, i) => (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`border bg-white p-6 ${tier.popular ? "border-brass" : "border-fog"}`}
              >
                {tier.popular && (
                  <p className="mb-3 inline-block border border-brass/40 bg-brass/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
                    Most Selected
                  </p>
                )}
                {tier.badge && !tier.popular && (
                  <p className="mb-3 inline-block border border-fog px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                    {tier.badge}
                  </p>
                )}

                <h2 className="text-2xl leading-tight text-midnight">{tier.name}</h2>
                <div className="mt-3 flex items-end gap-2 border-b border-fog pb-4">
                  <span className="metric-display text-3xl">{tier.price}</span>
                  <span className="text-sm text-stone">{tier.period}</span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-stone">{tier.timeline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{tier.description}</p>

                <ul className="mt-5 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-slate">
                      <Check className="mt-0.5 h-4 w-4 text-brass" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="mt-6 w-full" variant={tier.popular ? "default" : "outline"} asChild>
                  <Link href="/contact">{tier.cta}</Link>
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-30">
        <div className="mx-auto grid max-w-5xl gap-5 px-6 lg:grid-cols-2 lg:px-8">
          <article className="border border-fog p-7">
            <p className="section-label">Model 1</p>
            <h3 className="mt-3 text-3xl text-midnight">Build &amp; Transfer</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              We build your system and transfer full ownership: codebase, architecture docs, and operational playbook.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>Full code and IP ownership</li>
              <li>Team handoff and training support</li>
              <li>Best for companies with internal technical operators</li>
            </ul>
          </article>

          <article className="border border-fog p-7">
            <p className="section-label">Model 2</p>
            <h3 className="mt-3 text-3xl text-midnight">Managed Services</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              We build and run your system with continuous optimization, so your team focuses on execution and outcomes.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>No internal AI operations team required</li>
              <li>Ongoing tuning and governance included</li>
              <li>Best for teams prioritizing speed and certainty</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-midnight sm:text-5xl">Frequently Asked Questions</h2>
          <Accordion.Root type="single" collapsible className="mt-8 border border-fog bg-white">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="border-b border-fog last:border-b-0">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-midnight transition-colors hover:text-brass">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 text-stone transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 pb-5 text-sm leading-relaxed text-slate">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <section className="bg-midnight py-24 text-center lg:py-30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl text-white sm:text-5xl">Want a tailored commercial structure?</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            We can align scope and payment terms to your operating cadence, board cycle, and owner transition plan.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
