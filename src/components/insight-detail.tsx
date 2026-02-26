import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Insight, formatDate } from "@/data/insights";
import { MarkdownContent } from "@/components/markdown-content";

interface Props {
  insight: Insight;
  related: Insight[];
}

export function InsightDetailClient({ insight, related }: Props) {
  return (
    <>
      <section className="border-b border-border bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/insights" className="mb-8 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-teal">
            <ArrowLeft className="h-4 w-4" /> All Insights
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-md border border-teal/20 bg-teal/5 px-2 py-1 text-xs font-medium text-teal">{insight.category}</span>
            <span className="flex items-center gap-1 text-sm text-text-tertiary"><Clock className="h-3 w-3" /> {insight.readingTime} min read</span>
          </div>
          <h1 className="text-3xl font-bold text-text sm:text-4xl">{insight.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
            <span>{insight.author.name}</span>
            <span>•</span>
            <span>{formatDate(insight.date)}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {insight.tags.solutions.map((tag) => (
              <Link key={tag} href={`/solutions/${tag}`} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-secondary hover:border-teal hover:text-teal">solution:{tag}</Link>
            ))}
            {insight.tags.industries.map((tag) => (
              <Link key={tag} href={`/industries/${tag}`} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-secondary hover:border-teal hover:text-teal">industry:{tag}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <MarkdownContent markdown={insight.body} />
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text">FAQ</h2>
          <div className="mt-6 space-y-4">
            {insight.faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-lg font-semibold text-text">{faq.question}</h3>
                <p className="mt-2 text-base text-text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-text">Related Insights</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/insights/${item.slug}`} className="group rounded-lg border border-border bg-white p-6 hover:border-teal">
                  <span className="text-xs font-medium text-teal">{item.category}</span>
                  <h3 className="mt-2 text-lg font-bold text-text group-hover:text-teal">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-base text-text-secondary">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Turn insight into execution.</h2>
          <p className="mt-4 text-lg text-white/80">Use the AI Advisor for a recommendation tailored to your industry and challenge.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild><Link href="/advisor">Get Your AI Recommendation</Link></Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-text" asChild>
              <Link href="/contact">Book a Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
