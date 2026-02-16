"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LineChart, Cog, Rocket } from "lucide-react";

const services = [
  {
    icon: LineChart,
    title: "AI Revenue Operations",
    description: "AI-driven sales intelligence, automated prospecting, and pipeline analytics that turn data into deals.",
    metric: "30%",
    metricLabel: "avg pipeline increase",
    href: "/services",
  },
  {
    icon: Cog,
    title: "Performance Improvement",
    description: "Process mining, operational diagnostics, and custom automation that find and eliminate hidden inefficiencies.",
    metric: "$240K",
    metricLabel: "avg annual savings",
    href: "/services",
  },
  {
    icon: Rocket,
    title: "PE Value Creation",
    description: "AI-driven value creation for portfolio companies — from 90-day sprints to portfolio-wide AI playbooks.",
    metric: "10%",
    metricLabel: "avg EBITDA improvement",
    href: "/services",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-gray-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <span className="section-label">Services</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Three ways we drive results.
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>

        <div className="grid gap-0 md:grid-cols-3 border border-gray-200 rounded-lg bg-white overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className={`p-8 lg:p-10 ${i < services.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-teal">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {service.description}
              </p>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <span className="metric-display text-2xl">{service.metric}</span>
                <p className="text-xs text-slate-500 mt-1">{service.metricLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
