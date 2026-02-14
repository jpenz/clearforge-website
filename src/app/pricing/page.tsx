"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingTiers, faqs } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-blue">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Transparent Pricing, Measurable Results
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Three engagement models designed to meet you where you are — from
            first assessment to ongoing AI development.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                tier.popular
                  ? "border-blue bg-bg-card shadow-lg shadow-blue/5"
                  : "border-border-subtle bg-bg-card"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue px-3 py-1 text-xs font-medium text-white">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-text-muted">{tier.period}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{tier.timeline}</p>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mt-8 flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full"
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
          className="mt-16 rounded-xl border border-border-subtle bg-bg-card p-8 text-center sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <MessageSquare className="mx-auto h-8 w-8 text-blue" />
          <h2 className="mt-4 text-2xl font-bold text-text-primary">
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
          className="mt-16 grid gap-6 sm:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
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
              className="rounded-xl border border-border-subtle bg-bg-card p-6 text-center"
            >
              <p className="text-2xl font-bold text-text-primary">
                {signal.metric}
              </p>
              <p className="mt-1 text-sm text-text-muted">{signal.label}</p>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <div className="mt-24 border-t border-border-subtle pt-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-text-secondary">
              Everything you need to know about working with ClearForge.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-12 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
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
