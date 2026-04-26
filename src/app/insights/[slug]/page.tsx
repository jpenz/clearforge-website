import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { insights } from '@/data/insights';
import { articleJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/metadata';

function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seo.title,
    description: insight.seo.description,
    path: `/insights/${slug}`,
    keywords: insight.seo.keywords,
  });
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = insight.relatedSlugs
    .map((s) => getInsight(s))
    .filter(Boolean);

  /* Split the markdown body into sections by ## headings */
  const sections = insight.body.split(/^## /m).filter(Boolean);

  /* Schema.org structured data for AEO/GEO citation lift */
  const articleLd = articleJsonLd({
    title: insight.title,
    description: insight.excerpt,
    slug: insight.slug,
    date: insight.date,
    author: insight.author.name,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ]);
  const faqLd = insight.faqs.length > 0 ? faqJsonLd(insight.faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {/* ── Hero ── */}
      <section className="dark-section py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <span className="text-body-sm font-medium text-brass">
              {insight.category}
            </span>
            <span className="text-body-sm text-stone">
              {insight.readingTime} min read
            </span>
          </div>
          <h1 className="mt-6 text-display text-bone">{insight.title}</h1>
          <p className="mt-6 text-body-lg text-stone">{insight.excerpt}</p>
          <div className="mt-8 flex items-center gap-4 border-t border-bone/20 pt-8">
            <div>
              <p className="text-body-sm font-medium text-bone">
                {insight.author.name}
              </p>
              <p className="text-body-sm text-stone">{insight.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="prose-forge space-y-12">
            {sections.map((section, i) => {
              const lines = section.split('\n');
              const heading = lines[0]?.trim();
              const body = lines.slice(1).join('\n').trim();
              return (
                <div key={i}>
                  {heading && (
                    <h2 className="text-h2 mb-6">{heading}</h2>
                  )}
                  {body.split('\n\n').map((paragraph, j) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={j} className="text-h3 mt-8 mb-4">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    return (
                      <p
                        key={j}
                        className="text-body text-warm-gray mb-4 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {insight.faqs.length > 0 && (
        <section className="border-t border-divider bg-parchment py-24 lg:py-40">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="overline">FAQ</p>
            <h2 className="mt-6 text-display">Common questions.</h2>
            <div className="mt-12">
              {insight.faqs.map((faq, i) => (
                <div key={faq.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{faq.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">
                      {faq.answer}
                    </p>
                  </div>
                  {i < insight.faqs.length - 1 && (
                    <div className="h-px bg-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="bg-warm-white py-24 lg:py-40">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="overline">Related Reading</p>
            <div className="mt-12 grid gap-0">
              {related.map((r) =>
                r ? (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    className="group block border-t border-divider py-8 transition-colors hover:bg-parchment"
                  >
                    <span className="text-body-sm font-medium text-brass">
                      {r.category}
                    </span>
                    <h3 className="mt-2 text-h3 group-hover:text-brass transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-body text-warm-gray">{r.excerpt}</p>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">
            Ready to put this into practice?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            These ideas become real in the context of your business. Let us show
            you how.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/insights">All Insights</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
