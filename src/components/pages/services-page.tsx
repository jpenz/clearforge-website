"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export function ServicesPageClient() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
            Services
          </p>
          <h1 className="mt-6 font-serif text-4xl text-forge-navy sm:text-5xl lg:text-6xl">
            Strategy + engineering,
            <br />
            under one roof
          </h1>
          <p className="mt-6 max-w-xl text-lg text-text-secondary">
            Four service lines designed for mid-market companies and PE portfolio
            companies that need AI to deliver real business outcomes — not
            science projects.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="mt-20 space-y-0 divide-y divide-border-subtle border-y border-border-subtle">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              className="grid gap-8 py-16 lg:grid-cols-[1fr_1fr_auto]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {/* Info */}
              <div>
                <h2 className="font-serif text-2xl text-forge-navy sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm text-molten-amber">
                  {service.tagline}
                </p>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <p className="mt-4 text-xs text-text-muted">
                  <span className="font-medium text-forge-navy">
                    Ideal for:
                  </span>{" "}
                  {service.idealClient}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-text-muted">
                  Key Deliverables
                </p>
                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-molten-amber" />
                      <span className="text-sm text-text-secondary">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="min-w-[200px]">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-text-muted">
                  Outcomes
                </p>
                <div className="mt-4 space-y-4">
                  {service.outcomes.slice(0, 3).map((o) => (
                    <div key={o.metric}>
                      <span className="metric-display text-lg text-molten-amber">
                        {o.metric}
                      </span>
                      <p className="text-xs text-text-muted">{o.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-serif text-3xl text-forge-navy sm:text-4xl">
            Our process
          </h2>
          <div className="mt-12 grid gap-0 border border-border-subtle sm:grid-cols-2 lg:grid-cols-4">
            {["Discover", "Design", "Deploy", "Optimize"].map((step, i) => (
              <div
                key={step}
                className="border-b border-border-subtle p-8 sm:border-r last:border-b-0 last:border-r-0 lg:border-b-0"
              >
                <span className="metric-display text-sm text-molten-amber">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-lg text-forge-navy">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-24 bg-forge-navy p-10 text-center sm:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-serif text-3xl text-warm-white sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-warm-white/60">
            Book a 30-minute discovery call. We&apos;ll give you an honest
            assessment of where AI can help — and where it can&apos;t.
          </p>
          <Button size="xl" className="mt-8" asChild>
            <Link href="/contact">
              Book Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
