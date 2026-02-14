"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Calendar,
  Linkedin,
  Twitter,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Insight } from "@/data/insights";
import { formatDate, getRelatedInsights } from "@/data/insights";

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://clearforge.ai/insights/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-muted">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="p-2 text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function renderContent(content: string[]) {
  return content.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-12 mb-4 text-2xl font-serif text-forge-navy"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }

    if (block.startsWith("**") && block.includes("**")) {
      const parts = block.split("**");
      return (
        <p key={i} className="mt-4 text-text-secondary leading-relaxed">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-serif text-forge-navy">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }

    return (
      <p key={i} className="mt-4 text-text-secondary leading-relaxed">
        {block.split(/(\*[^*]+\*)/).map((segment, j) => {
          if (segment.startsWith("*") && segment.endsWith("*") && !segment.startsWith("**")) {
            return (
              <em key={j} className="italic">
                {segment.slice(1, -1)}
              </em>
            );
          }
          return segment;
        })}
      </p>
    );
  });
}

export function InsightDetail({ insight }: { insight: Insight }) {
  const relatedInsights = getRelatedInsights(insight.relatedSlugs);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/insights"
            className="inline-flex items-center text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All Insights
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mx-auto mt-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="bg-molten-amber/10 px-3 py-1 text-xs font-medium text-molten-amber">
              {insight.category}
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-serif text-forge-navy sm:text-4xl lg:text-5xl leading-tight">
            {insight.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(insight.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {insight.readingTime} min read
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-b border-border-subtle pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-molten-amber/10">
                <span className="text-sm font-bold text-molten-amber">CF</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {insight.author.name}
                </p>
                <p className="text-xs text-text-muted">
                  {insight.author.role}
                </p>
              </div>
            </div>
            <ShareButtons title={insight.title} slug={insight.slug} />
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          className="mx-auto mt-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-lg font-medium text-text-primary leading-relaxed">
            {insight.excerpt}
          </p>
          {renderContent(insight.content)}
        </motion.article>

        {/* Author Box */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl border border-border-subtle bg-canvas p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-molten-amber/10">
              <span className="text-lg font-bold text-molten-amber">CF</span>
            </div>
            <div>
              <p className="text-lg font-serif text-forge-navy">
                {insight.author.name}
              </p>
              <p className="text-sm text-text-muted">{insight.author.role}</p>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                ClearForge combines management consulting rigor with hands-on AI
                engineering to deliver measurable results for mid-market
                companies and PE portfolio companies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedInsights.length > 0 && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-serif text-forge-navy">
              Related Articles
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {relatedInsights.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={`/insights/${related.slug}`}
                    className="group flex h-full flex-col border border-border-subtle bg-canvas p-6 transition-all hover:border-molten-amber/30 hover:bg-bg-elevated"
                  >
                    <span className="inline-flex self-start bg-molten-amber/10 px-3 py-1 text-xs font-medium text-molten-amber">
                      {related.category}
                    </span>
                    <h3 className="mt-3 text-lg font-serif text-forge-navy leading-snug">
                      {related.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-text-secondary leading-relaxed">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-text-muted">
                        {related.readingTime} min read
                      </span>
                      <span className="flex items-center font-medium text-molten-amber">
                        Read
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-24 border-t border-border-subtle pt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-serif text-forge-navy">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            See how AI-ready your business is with our free assessment, or book
            a call to discuss your specific challenges.
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
