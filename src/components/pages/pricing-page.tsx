"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingTiers, faqs } from "@/data/pricing";

export function PricingPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-molten-amber">
            Pricing
          </p>
          <h1 className="mt-4 font-serif text-4xl text-forge-navy sm:text-5xl">
            Transparent Pricing, Measurable Results
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Three engagement models designed to meet you where you are — from
            first assessment to ongoing AI development.
          </p>
        </motion.div>

        {/* Pricing — editorial layout with ruled separators */}
        <div className="mt-16 divide-y divide-border-subtle">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="grid gap-8 py-12 lg:grid-cols-[2fr_3fr_auto]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div>
                <h3 className="font-serif text-2xl text-forge-navy">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="metric-display text-3xl text-molten-amber">
                    {tier.price}
                  </span>
                  <span className="text-sm text-text-muted">{tier.period}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[1.5px] text-text-muted">
                  {tier.timeline}
                </p>
              </div>

              <div>
                <p className="text-text-secondary leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-molten-amber" />
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start">
                <Button
                  size="lg"
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact">
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Engagement CTA */}
        <motion.div
          className="mt-16 border border-border-subtle bg-canvas p-8 text-center sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <MessageSquare className="mx-auto h-8 w-8 text-molten-amber" />
          <h2 className="mt-4 font-serif text-2xl text-forge-navy">
            Need Something Custom?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            For larger transformations, portfolio-wide rollouts, or engagements
            that don&apos;t fit neatly into a package — let&apos;s talk. We
            design custom engagements scoped to your specific goals and
            timeline.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              Book a Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          className="mt-16 grid gap-0 divide-x divide-border-subtle border border-border-subtle sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          {[
            {
              metric: "90-Day",
              label: "Average time to measurable ROI",
            },
            {
              metric: "100%",
              label: "Of deliverables are yours to keep",
            },
            {
              metric: "24hr",
              label: "Response time on all engagements",
            },
          ].map((signal) => (
            <div
              key={signal.label}
              className="p-6 text-center"
            >
              <p className="metric-display text-2xl text-molten-amber">
                {signal.metric}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[1.5px] text-text-muted">
                {signal.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-serif text-3xl text-forge-navy sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-text-secondary">
              Everything you need to know about working with ClearForge.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
