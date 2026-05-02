import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { useCases } from '@/data/use-cases';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Use Cases for Growth, Service, Operations, Quality, and PE Value Creation',
  url: 'https://clearforge.ai/use-cases',
  description:
    'Concrete AI use cases ClearForge builds for mid-market operators: sales pipeline acceleration, customer service, operations efficiency, knowledge work, quality exceptions, and PE portfolio value creation.',
  hasPart: useCases.map((useCase) => ({
    '@type': 'Service',
    name: useCase.title,
    url: `https://clearforge.ai/use-cases/${useCase.slug}`,
    description: useCase.summary,
  })),
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Use Cases', path: '/use-cases' },
]);

export const metadata = createMetadata({
  title: 'AI Use Cases for Growth, Service, Operations, and Margin',
  description:
    'Explore practical AI use cases ClearForge builds for mid-market operators: sales pipeline acceleration, customer service, operations efficiency, knowledge work, quality exceptions, and PE value creation.',
  path: '/use-cases',
  keywords: [
    'AI use cases',
    'AI automation use cases',
    'AI agents use cases',
    'AI workflow automation',
    'mid-market AI consulting',
  ],
});

const operatingLoop = [
  'Find the growth spot',
  'Design the AI + people machine',
  'Ship the first workflow',
  'Measure adoption and margin',
];

export default function UseCasesPage() {
  return (
    <>
      <JsonLdScript data={collectionLd} />
      <JsonLdScript data={breadcrumbLd} />

      <section className="dark-section noise-texture relative min-h-[78svh] overflow-hidden py-32 lg:py-44">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="pointer-events-none object-cover opacity-[0.2]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,30,0.96)_0%,rgba(10,15,30,0.82)_48%,rgba(10,15,30,0.48)_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">AI Use Cases</p>
          <h1 className="mt-6 max-w-5xl text-display text-bone">
            The highest-leverage places to build AI into the operating machine.
          </h1>
          <p className="mt-7 max-w-2xl text-body-lg text-stone">
            These are the use cases where AI most often turns into real buyer urgency: growth,
            customer service, operations speed, knowledge work, quality, and PE value creation. Each
            page shows the trigger pattern, the machine, and the first build path.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="#use-case-grid">Explore Use Cases</Link>
            </Button>
          </div>

          <div className="mt-14 grid max-w-4xl gap-3 sm:grid-cols-4">
            {operatingLoop.map((step, index) => (
              <div key={step} className="border-t border-bone/15 pt-4">
                <p className="metric text-xs text-brass-light">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 text-sm text-bone/75">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-case-grid" className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <p className="overline">High-Value Workflows</p>
              <h2 className="mt-6 text-display">
                Built around the problems that drain growth, speed, and margin.
              </h2>
            </div>
            <p className="mt-8 text-body-lg text-warm-gray lg:col-span-6 lg:col-start-7 lg:mt-0">
              Each use case starts with an operating constraint your team can already feel, then
              shows the AI system, human workflow, and first build path that would change it.
            </p>
          </div>

          <Stagger className="mt-16 grid gap-8 lg:grid-cols-3" stagger={0.08}>
            {useCases.map((useCase) => (
              <StaggerItem key={useCase.slug}>
                <Link
                  href={`/use-cases/${useCase.slug}`}
                  className="group block overflow-hidden border border-divider bg-warm-white transition-colors hover:bg-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={useCase.visual.poster}
                      alt={useCase.visual.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forge-black/60 via-transparent to-transparent" />
                    <p className="absolute left-5 bottom-5 overline text-brass-light">
                      {useCase.eyebrow}
                    </p>
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="text-h3 transition-colors group-hover:text-brass">
                      {useCase.title}
                    </h3>
                    <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">
                      {useCase.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-divider pt-5">
                      <span className="text-sm font-semibold text-anthracite">
                        View the machine
                      </span>
                      <ArrowRight className="h-4 w-4 text-brass transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-divider bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="overline">Why These Use Cases Work</p>
              <h2 className="mt-6 text-display">
                AI gets valuable when it changes the daily operating cadence.
              </h2>
            </div>
            <div className="mt-10 space-y-8 lg:col-span-7 lg:mt-0">
              {[
                [
                  'They start with business triggers',
                  'The best AI systems know what event creates urgency: a capital project, delayed handoff, quality issue, service risk, or portfolio value lever.',
                ],
                [
                  'They make the machine concrete',
                  'The work becomes specific: what gets built, who uses it, what decisions change, what cadence runs, and where human judgment stays in the loop.',
                ],
                [
                  'They compound through feedback',
                  'Every workflow needs a review loop so the system learns from rep feedback, service outcomes, exception patterns, and management decisions.',
                ],
              ].map(([title, description]) => (
                <div key={title} className="border-t border-divider pt-6">
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-3 text-body text-warm-gray">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Find your highest-value AI use case.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Start with your website. We will map the growth, speed, quality, service, efficiency,
            and margin opportunities worth building first.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
