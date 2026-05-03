import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { MotionBackground } from '@/components/ui/motion-background';
import { OperatorSystemPreview } from '@/components/use-cases/operator-system-preview';
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
      <JsonLdScript data={breadcrumbLd} />
      <JsonLdScript data={serviceLd} />
      <JsonLdScript data={faqJsonLd(useCase.faqs)} />

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
                  Map My First Build <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href="#system">See the Operating Build</Link>
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

      <section className="border-t border-divider bg-recessed py-20 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="overline">Field Pattern</p>
              <h2 className="mt-6 text-display">{useCase.fieldProof.headline}</h2>
            </div>
            <div className="mt-10 grid gap-4 lg:col-span-8 lg:mt-0 lg:grid-cols-[1.05fr_1.35fr]">
              <div className="border border-divider bg-warm-white p-6">
                <p className="overline text-[10px]">Observed Pattern</p>
                <p className="mt-5 text-body text-warm-gray">{useCase.fieldProof.body}</p>
              </div>
              <div className="border border-divider bg-parchment p-6">
                <p className="overline text-[10px]">Operating Rules</p>
                <div className="mt-5 space-y-4">
                  {useCase.fieldProof.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brass" />
                      <p className="text-body-sm leading-relaxed text-anthracite">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OperatorSystemPreview useCase={useCase} />

      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="overline">Best Fit</p>
              <h2 className="mt-6 text-display">Where this is worth the effort.</h2>
            </div>
            <div className="mt-12 grid gap-4 lg:col-span-8 lg:mt-0 lg:grid-cols-[0.95fr_1.4fr]">
              <div className="border border-divider bg-warm-white p-6">
                <p className="overline text-[10px]">Good Candidate</p>
                <p className="mt-5 text-body-lg text-anthracite">{useCase.bestFor}</p>
              </div>
              <div className="border border-divider bg-warm-white p-6">
                <p className="overline text-[10px]">Diagnostic Checklist</p>
                <div className="mt-5 grid gap-3">
                  {useCase.symptoms.map((symptom) => (
                    <div key={symptom} className="flex gap-3 border-t border-divider pt-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brass" />
                      <p className="text-body-sm leading-relaxed text-anthracite">{symptom}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="overline">Operating Build</p>
              <h2 className="mt-6 text-display text-bone">What ClearForge puts around the work.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <div className="grid overflow-hidden border border-bone/15 bg-bone/10 lg:grid-cols-4">
                {useCase.machine.map((layer, index) => (
                  <div
                    key={layer.label}
                    className="border-b border-bone/15 bg-forge-black/40 p-6 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
                  >
                    <p className="metric text-xs text-brass-light">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-5 text-h3 text-bone">{layer.label}</h3>
                    <p className="mt-4 text-body-sm leading-relaxed text-stone">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-bone/15 pt-6">
                <p className="overline text-[10px] text-brass-light">First Builds Worth Shipping</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {useCase.plays.map((play) => (
                    <div key={play.title} className="border border-bone/15 bg-bone/[0.04] p-4">
                      <h3 className="text-base font-semibold text-bone">{play.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone">{play.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Implementation Path</p>
          <h2 className="mt-6 max-w-3xl text-display">From use case to management habit.</h2>
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
            <div className="mt-12 grid gap-4 lg:col-span-8 lg:mt-0 lg:grid-cols-2">
              {useCase.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border border-divider bg-warm-white p-6"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-h4">{faq.question}</span>
                    <span className="mt-1 text-brass transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Find where this belongs in your company.</h2>
          <p className="mt-6 text-body-lg text-stone">
            The fastest path is choosing one workflow worth fixing, building the controls around it,
            and training your team into the new cadence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map My First Build <ArrowRight className="ml-2 h-4 w-4" />
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
