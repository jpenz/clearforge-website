import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { formatDate, insights } from '@/data/insights';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Insights — ClearForge',
  description:
    'Practical thinking on AI strategy, performance improvement, and value creation from the ClearForge team.',
  path: '/insights',
});

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'ClearForge Field Library',
  url: 'https://clearforge.ai/insights',
  description:
    'Executive briefs on AI strategy, workflow design, custom agent architecture, governance, adoption, and PE value creation.',
  hasPart: insights.map((insight) => ({
    '@type': 'BlogPosting',
    headline: insight.title,
    url: `https://clearforge.ai/insights/${insight.slug}`,
    description: insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.dateModified ?? insight.date,
  })),
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
]);

const fieldGuideSlugs = [
  'clearforge-ai-transformation-maturity-model',
  'ai-pilots-operating-systems',
  'custom-agent-stack-mid-market',
  'pe-ai-ebitda-playbook',
];

export default function InsightsPage() {
  const featured = insights[0];
  const rest = insights.slice(1);
  const fieldGuides = fieldGuideSlugs
    .map((slug) => insights.find((insight) => insight.slug === slug))
    .filter((insight): insight is (typeof insights)[number] => Boolean(insight));

  return (
    <>
      <JsonLdScript data={collectionLd} />
      <JsonLdScript data={breadcrumbLd} />

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
          <p className="overline">ClearForge Field Library</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            Executive briefs for building AI that ships.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            Strategy, workflow design, custom agent architecture, governance, and adoption guidance
            for leaders who need AI to improve how the company actually runs.
          </p>
        </div>
      </section>

      {/* ── Start Here ── */}
      {fieldGuides.length > 0 && (
        <section className="border-b border-divider bg-warm-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <div>
                <p className="overline">Start Here</p>
                <h2 className="mt-4 text-h2">The shortest path through the library.</h2>
                <p className="mt-4 text-body text-warm-gray">
                  Four reads cover the operating model: maturity, pilot-to-production movement,
                  custom stack design, and PE value creation.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-2">
                {fieldGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/insights/${guide.slug}`}
                    className="group bg-warm-white p-5 transition-colors hover:bg-parchment"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-brass">
                      {guide.category}
                    </span>
                    <h3 className="mt-3 text-h4 transition-colors group-hover:text-brass">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                      {guide.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Article ── */}
      {featured && (
        <section className="bg-warm-white py-24 lg:py-40">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="overline mb-10">Featured Brief</p>
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
          <p className="overline">Library</p>

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
          <h2 className="text-display text-bone">Want to pressure-test one workflow?</h2>
          <p className="mt-6 text-body-lg text-stone">
            Bring the workflow you are considering. The diagnostic shows whether the value case,
            data path, controls, and adoption cadence are ready for a build.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/scorecard">
                Run Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/discover">Generate AI Value Map</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
