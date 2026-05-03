import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate, insights } from '@/data/insights';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Insights — ClearForge',
  description:
    'Practical thinking on AI strategy, performance improvement, and value creation from the ClearForge team.',
  path: '/insights',
});

export default function InsightsPage() {
  const featured = insights[0];
  const rest = insights.slice(1);

  return (
    <>
      {/* ── Hero with atmospheric bg ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-dataflow.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Insights</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            Thinking that shapes how we work.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            Practical frameworks, lessons from real engagements, and honest perspectives on where AI
            actually creates value.
          </p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <section className="bg-warm-white py-24 lg:py-40">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <Link
              href={`/insights/${featured.slug}`}
              className="group block lg:grid lg:grid-cols-12 lg:gap-20"
            >
              <div className="lg:col-span-8">
                <span className="text-body-sm font-medium text-brass">{featured.category}</span>
                <h2 className="mt-4 text-display group-hover:text-brass transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-6 text-body-lg text-warm-gray">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-brass">
                  Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
              <div className="mt-8 lg:col-span-4 lg:mt-0 lg:flex lg:flex-col lg:justify-end">
                <p className="text-body-sm text-warm-gray">{featured.author.name}</p>
                <time className="text-body-sm text-warm-gray" dateTime={featured.date}>
                  {formatDate(featured.date)}
                </time>
                <p className="text-body-sm text-warm-gray">{featured.readingTime} min read</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── All Articles ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">All Articles</p>

          <div className="mt-12 grid gap-0">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group block border-t border-divider py-10 transition-colors hover:bg-warm-white"
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4">
                      <span className="text-body-sm font-medium text-brass">
                        {article.category}
                      </span>
                      <time className="text-body-sm text-warm-gray" dateTime={article.date}>
                        {formatDate(article.date)}
                      </time>
                      <span className="text-body-sm text-warm-gray">
                        {article.readingTime} min read
                      </span>
                    </div>
                    <h3 className="mt-3 text-h2 group-hover:text-brass transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-body text-warm-gray max-w-2xl">{article.excerpt}</p>
                  </div>
                  <div className="mt-4 lg:col-span-4 lg:mt-0 lg:flex lg:items-end lg:justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {rest.length === 0 && (
              <div className="border-t border-divider pt-10">
                <p className="text-body text-warm-gray">More articles coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Want to talk through a specific challenge?</h2>
          <p className="mt-6 text-body-lg text-stone">
            These articles represent how we think. A discovery call shows how we apply it to your
            business.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/contact">
                Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
