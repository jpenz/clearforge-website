import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { insights, formatDate } from "@/data/insights";

export function InsightsPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Insights</span>
            <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl">Thought leadership for operators building AI advantage.</h1>
            <p className="mt-6 text-lg text-text-secondary">Research-backed perspectives on AI strategy, implementation, modernization, and hybrid workforce execution.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <article key={insight.slug} className="group overflow-hidden rounded-lg border border-border bg-white">
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-md border border-teal/20 bg-teal/5 px-2 py-1 text-xs font-medium text-teal">{insight.category}</span>
                    <span className="flex items-center gap-1 text-sm text-text-tertiary"><Clock className="h-3 w-3" /> {insight.readingTime} min</span>
                  </div>
                  <Link href={`/insights/${insight.slug}`}>
                    <h2 className="text-lg font-bold text-text transition-colors group-hover:text-teal">{insight.title}</h2>
                  </Link>
                  <p className="mt-3 line-clamp-3 text-base text-text-secondary">{insight.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-text-tertiary">{formatDate(insight.date)}</span>
                    <Link href={`/insights/${insight.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-light">
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
