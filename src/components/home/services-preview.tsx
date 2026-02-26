"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "AI Strategy & Market Intelligence",
    outcome: "Opportunity map in 4 weeks",
    text: "Identify and rank where AI creates commercial lift before engineering spend begins.",
    href: "/services#ai-strategy",
  },
  {
    title: "AI Design & Build",
    outcome: "Production systems in 6-8 weeks",
    text: "Design and deploy AI-enabled workflows tied directly to operating metrics.",
    href: "/services#ai-design-build",
  },
  {
    title: "Managed AI Operations",
    outcome: "Monthly optimization cadence",
    text: "Retuning, retraining, and monitoring so results compound instead of deteriorate.",
    href: "/services#managed-ai-operations",
  },
  {
    title: "AI Readiness Assessment",
    outcome: "Fixed-price 4-week diagnostic",
    text: "A low-risk entry engagement with a scored baseline and 90-day action plan.",
    href: "/services#ai-readiness-assessment",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-white py-24 lg:py-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="section-label">Service Lines</span>
          <h2 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl">
            Structured around the way value is actually created.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Each service aligns to a distinct stage in the transformation cycle. Start where you have urgency,
            then expand as proof accumulates.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group border border-fog bg-ivory p-7 transition-colors hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-brass">{service.outcome}</p>
              <h3 className="mt-3 text-2xl leading-tight text-midnight">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{service.text}</p>
              <Link
                href={service.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.1em] text-midnight"
              >
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="mt-10"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View Full Services and Deliverables</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
