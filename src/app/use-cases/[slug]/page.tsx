/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: JSON-LD scripts are generated from static site data. */
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MotionBackground } from '@/components/ui/motion-background';
import { getUseCaseBySlug, useCases } from '@/data/use-cases';
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from '@/lib/metadata';

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return {};

  return createMetadata({
    title: useCase.seoTitle,
    description: useCase.metaDescription,
    path: `/use-cases/${slug}`,
    keywords: useCase.keywords,
  });
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) notFound();

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: useCase.title, path: `/use-cases/${useCase.slug}` },
  ]);

  const serviceLd = serviceJsonLd({
    title: useCase.title,
    description: useCase.summary,
    path: `/use-cases/${useCase.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(useCase.faqs)) }}
      />

      <section className="dark-section relative min-h-[84svh] overflow-hidden py-32 lg:py-48">
        <MotionBackground
          poster={useCase.visual.poster}
          mp4={useCase.visual.mp4}
          webm={useCase.visual.webm}
          imageAlt=""
          priority
          storageKey={`clearforge:use-case:${useCase.slug}:motion-paused`}
          imageClassName="opacity-50"
          videoClassName="opacity-[0.52]"
          controlClassName="top-24 right-4 lg:top-auto lg:right-8 lg:bottom-8"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,30,0.96)_0%,rgba(10,15,30,0.78)_48%,rgba(10,15,30,0.42)_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forge-black to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <p className="overline">{useCase.eyebrow}</p>
            <h1 className="mt-6 text-display text-bone">{useCase.heroStatement}</h1>
            <p className="mt-7 max-w-2xl text-body-lg text-stone">{useCase.outcome}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/discover">
                  Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href="#machine">See What Gets Built</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
            {useCase.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-bone/15 pt-5">
                <p className="metric text-2xl text-brass-light">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold text-bone">{metric.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="overline">Best Fit</p>
              <h2 className="mt-6 text-display">Where this creates the most value.</h2>
              <p className="mt-6 text-body-lg text-warm-gray">{useCase.bestFor}</p>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="overline">Symptoms</p>
              <div className="mt-6 border-t border-divider">
                {useCase.symptoms.map((symptom, index) => (
                  <div key={symptom} className="flex gap-5 border-b border-divider py-5">
                    <span className="metric shrink-0 text-sm text-brass">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-anthracite">{symptom}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="machine" className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">The Machine</p>
          <h2 className="mt-6 max-w-3xl text-display text-bone">
            What ClearForge builds around the work.
          </h2>
          <div className="mt-16 grid gap-0 lg:grid-cols-4">
            {useCase.machine.map((layer, index) => (
              <div key={layer.label} className="border-t border-bone/15 py-8 lg:px-6">
                <p className="metric text-xs text-brass-light">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-h3 text-bone">{layer.label}</h3>
                <p className="mt-4 text-body-sm leading-relaxed text-stone">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline">Production Plays</p>
              <h2 className="mt-6 text-display">The first systems worth shipping.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <div className="grid gap-8 sm:grid-cols-2">
                {useCase.plays.map((play) => (
                  <div key={play.title} className="border-t border-divider pt-6">
                    <h3 className="text-h3">{play.title}</h3>
                    <p className="mt-3 text-body text-warm-gray">{play.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Implementation Path</p>
          <h2 className="mt-6 max-w-3xl text-display">From use case to operating habit.</h2>
          <div className="mt-16 border-t border-divider">
            {useCase.process.map((step, index) => (
              <div
                key={step.phase}
                className="grid gap-4 border-b border-divider py-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-3">
                  <p className="metric text-sm text-brass">
                    {String(index + 1).padStart(2, '0')} · {step.phase}
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-h3">{step.title}</h3>
                </div>
                <p className="text-body text-warm-gray lg:col-span-5">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline">Related Paths</p>
              <h2 className="mt-6 text-display">Keep exploring.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <div className="border-t border-divider">
                {useCase.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-8 border-b border-divider py-6"
                  >
                    <span className="text-h3 transition-colors group-hover:text-brass">
                      {link.label}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-warm-gray transition-all group-hover:translate-x-1 group-hover:text-brass" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="overline">FAQ</p>
              <h2 className="mt-6 text-display">Questions buyers ask first.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <div className="border-t border-divider">
                {useCase.faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-divider py-7">
                    <h3 className="text-h3">{faq.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Find where this applies inside your company.</h2>
          <p className="mt-6 text-body-lg text-stone">
            The fastest path is not choosing a generic AI tool. It is finding the growth spot,
            building the operating machine, and training your people into the new cadence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/use-cases">View All Use Cases</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
