"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";

const allServices = ["All", ...new Set(caseStudies.map((cs) => cs.service))];
const allIndustries = ["All", ...new Set(caseStudies.map((cs) => cs.industry))];

export function CaseStudiesPageClient() {
  const [serviceFilter, setServiceFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const filtered = caseStudies.filter((cs) => {
    if (serviceFilter !== "All" && cs.service !== serviceFilter) return false;
    if (industryFilter !== "All" && cs.industry !== industryFilter) return false;
    return true;
  });

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
            Case Studies
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Results That Speak for Themselves
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Real outcomes from real engagements. Names withheld, numbers
            verified.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-muted">Service:</span>
            {allServices.map((s) => (
              <button
                key={s}
                onClick={() => setServiceFilter(s)}
                aria-pressed={serviceFilter === s}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  serviceFilter === s
                    ? "bg-blue text-white"
                    : "bg-bg-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-muted">Industry:</span>
            {allIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                aria-pressed={industryFilter === ind}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  industryFilter === ind
                    ? "bg-blue text-white"
                    : "bg-bg-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case Study Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {filtered.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border-subtle bg-bg-card p-8 transition-all hover:border-blue/30 hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-medium text-blue">
                    {cs.service}
                  </span>
                  <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs text-text-muted">
                    {cs.industry}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-text-primary">
                  {cs.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-text-secondary leading-relaxed">
                  {cs.excerpt}
                </p>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-text-primary">
                      {cs.heroMetric}
                    </p>
                    <p className="text-sm text-text-muted">
                      {cs.heroMetricLabel}
                    </p>
                  </div>
                  <span className="flex items-center text-sm font-medium text-blue">
                    Read Case Study
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-text-muted">
              No case studies match these filters.
            </p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setServiceFilter("All");
                setIndustryFilter("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary">
            Ready for Results Like These?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Every engagement starts with a conversation. Book a free discovery
            call to discuss your business.
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
