"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  insights,
  insightCategories,
  formatDate,
} from "@/data/insights";

const allCategories = ["All", ...insightCategories];

export default function InsightsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered =
    categoryFilter === "All"
      ? insights
      : insights.filter((i) => i.category === categoryFilter);

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
            Insights
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Practical AI Strategy for Business Leaders
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            No hype, no jargon. Actionable frameworks and lessons from real AI
            implementations.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                categoryFilter === cat
                  ? "bg-blue text-white"
                  : "bg-bg-elevated text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {categoryFilter === "All" && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href={`/insights/${filtered[0].slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card transition-all hover:border-blue/30 hover:bg-bg-elevated md:flex-row"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue/20 via-bg-elevated to-emerald/10 md:aspect-auto md:w-2/5">
                <div className="p-12 text-center">
                  <div className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-xs font-medium text-blue">
                    Featured
                  </div>
                  <p className="mt-4 font-mono text-sm text-text-muted">
                    {filtered[0].category}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(filtered[0].date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {filtered[0].readingTime} min read
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-text-primary sm:text-3xl">
                  {filtered[0].title}
                </h2>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {filtered[0].excerpt}
                </p>
                <div className="mt-4">
                  <span className="flex items-center text-sm font-medium text-blue">
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(categoryFilter === "All" ? filtered.slice(1) : filtered).map(
            (post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border-subtle bg-bg-card transition-all hover:border-blue/30 hover:bg-bg-elevated"
                >
                  <div className="flex aspect-[2/1] items-center justify-center rounded-t-xl bg-gradient-to-br from-blue/10 via-bg-elevated to-emerald/5">
                    <p className="font-mono text-sm text-text-muted">
                      {post.category}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-text-primary leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-text-secondary leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4">
                      <span className="flex items-center text-sm font-medium text-blue">
                        Read Article
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          )}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-text-muted">
              No articles in this category yet.
            </p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setCategoryFilter("All")}
            >
              View All Articles
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
            Ready to Put These Insights Into Action?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Take our free AI Readiness Scorecard to see where your business
            stands — and where to start.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/scorecard">
                Take AI Scorecard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/contact">Book Discovery Call</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
