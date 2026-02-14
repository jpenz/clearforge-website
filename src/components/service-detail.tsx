"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceIcons } from "@/lib/icons";
import type { Service } from "@/data/services";

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue/10">
            <Icon className="h-7 w-7 text-blue" />
          </div>
          <h1 className="mt-6 text-4xl font-bold text-text-primary sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{service.tagline}</p>
          <p className="mt-6 text-text-secondary leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* Ideal Client */}
        <motion.div
          className="mx-auto mt-12 max-w-2xl rounded-xl border border-border-subtle bg-bg-card p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-blue">
            Ideal Client
          </p>
          <p className="mt-2 text-text-secondary">{service.idealClient}</p>
        </motion.div>

        {/* What We Deliver */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold text-text-primary">
            What We Deliver
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            {service.deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                <span className="text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typical Outcomes */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold text-text-primary">
            Typical Outcomes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.metric}
                className="rounded-xl border border-border-subtle bg-bg-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-2xl font-bold text-text-primary">
                  {outcome.metric}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Workflow */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold text-text-primary">
            How We Work
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.workflow.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-xl border border-border-subtle bg-bg-card p-6"
              >
                <span className="text-xs font-medium text-blue">
                  {step.phase}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {step.description}
                </p>
                {i < service.workflow.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-text-muted lg:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-text-secondary">
            Book a free discovery call to discuss how {service.title.toLowerCase()} can
            drive results for your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
