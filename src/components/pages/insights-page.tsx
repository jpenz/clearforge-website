"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { insights, formatDate } from "@/data/insights";

export function InsightsPageClient() {
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
            Insights
          </p>
          <h1 className="mt-6 font-serif text-4xl text-forge-navy sm:text-5xl lg:text-6xl">
            Practical intelligence,
            <br />
            not vendor hype
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Frameworks, case studies, and guides for business leaders
            navigating AI strategy and implementation.
          </p>
        </motion.div>

        {/* Featured (first article) */}
        {insights.slice(0, 1).map((insight) => (
          <motion.div
            key={insight.slug}
            className="mt-16 border border-border-accent bg-canvas"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-10 sm:p-14">
              <div className="flex items-center gap-4">
                <span className="bg-molten-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-[1.5px] text-molten-amber">
                  {insight.category}
                </span>
                <span className="text-xs text-text-muted">
                  {formatDate(insight.date)} &middot; {insight.readingTime} min
                  read
                </span>
              </div>
              <h2 className="mt-6 font-serif text-3xl text-forge-navy">
                {insight.title}
              </h2>
              <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
                {insight.excerpt}
              </p>
              <Link
                href={`/insights/${insight.slug}`}
                className="amber-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-molten-amber"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}

        {/* All articles */}
        <div className="mt-16 divide-y divide-border-subtle border-y border-border-subtle">
          {insights.slice(1).map((insight, i) => (
            <motion.div
              key={insight.slug}
              className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div className="min-w-[140px]">
                <span className="text-xs text-text-muted">
                  {formatDate(insight.date)}
                </span>
                <p className="mt-1 text-xs uppercase tracking-[1.5px] text-molten-amber">
                  {insight.category}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-forge-navy">
                  {insight.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                  {insight.excerpt}
                </p>
              </div>
              <Link
                href={`/insights/${insight.slug}`}
                className="amber-underline inline-flex items-center gap-1 text-sm text-molten-amber"
              >
                Read
                <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
