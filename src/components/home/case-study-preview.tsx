"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Globe, LineChart, Repeat, Star, Workflow } from "lucide-react";

const stats = [
  { value: "No Website", label: "Starting Point", icon: Globe },
  { value: "Recurring Contracts", label: "New Revenue Base", icon: Repeat },
  { value: "Always-On", label: "Campaign Motion", icon: Workflow },
  { value: "Review Engine", label: "Reputation System", icon: Star },
  { value: "Growth Mode", label: "Business Direction", icon: LineChart },
  { value: "PE-Ready", label: "Documented Systems", icon: Building2 },
];

export function CaseStudyPreview() {
  return (
    <section className="bg-slate-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-teal">Featured Case Study</span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Metro Detroit Services Company Rebuilt from Marketing Zero
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-200">
              A 20+ year legacy business with declining customers had no website, no pipeline engine, and no repeatable outreach. ClearForge implemented a complete marketing operating system and moved the company into active growth with recurring commercial contracts.
            </p>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/case-studies/metro-detroit-services-company">
                Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-charcoal bg-charcoal p-5"
              >
                <stat.icon className="h-5 w-5 text-teal mb-2" />
                <div className="metric-display text-2xl">{stat.value}</div>
                <p className="mt-1 text-base text-slate-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
