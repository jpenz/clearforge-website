"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { insights, insightCategories, formatDate } from "@/data/insights";
import { ArrowRight, Clock } from "lucide-react";

export function InsightsPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="section-label">Insights</span>
            <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Thinking that <span className="gradient-text">drives action.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500">
              Practical perspectives on AI implementation, performance improvement, and value creation.
              No buzzwords — just substance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <motion.article
                key={insight.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-lg border border-gray-200 bg-white overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-teal border border-teal/20 bg-teal/5 rounded-md px-2 py-1">{insight.category}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" /> {insight.readingTime} min
                    </span>
                  </div>
                  <Link href={`/insights/${insight.slug}`}>
                    <h2 className="text-lg font-bold text-slate-navy group-hover:text-teal transition-colors" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {insight.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">{insight.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{formatDate(insight.date)}</span>
                    <Link href={`/insights/${insight.slug}`} className="text-xs font-medium text-teal hover:text-teal-light transition-colors inline-flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
