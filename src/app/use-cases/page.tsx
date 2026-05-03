import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { UseCaseCardVisual } from '@/components/use-cases/use-case-card-visual';
import { useCases } from '@/data/use-cases';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Use Cases for Growth, Service, Operations, Quality, and PE Value Creation',
  url: 'https://clearforge.ai/use-cases',
  description:
    'Practical AI use cases ClearForge builds for operators: sales pipeline acceleration, service quality, operations flow, knowledge work, quality exceptions, and PE value creation.',
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
    'Explore practical AI use cases ClearForge builds for operators: sales pipeline acceleration, service quality, operations flow, knowledge work, quality exceptions, and PE value creation.',
  path: '/use-cases',
  keywords: [
    'AI use cases',
    'AI automation use cases',
    'AI workflow use cases',
    'AI workflow automation',
    'mid-market AI consulting',
  ],
});

const operatingLoop = [
  'Find the constraint',
  'Design the review path',
  'Ship the first working flow',
  'Measure adoption and margin',
];

const useCaseLegend = [
  ['Trigger', 'What event makes the work urgent'],
  ['Owner', 'Who reviews and acts'],
  ['Control', 'Where judgment stays human'],
  ['First build', 'What ships before scale'],
];

const valueStages = [
  {
    label: 'Trigger',
    title: 'Start where the business already feels friction.',
    detail: 'A delayed handoff, quality issue, service risk, missed growth signal, or margin leak.',
  },
  {
    label: 'Workflow',
    title: 'Make the operating path visible.',
    detail: 'Draft, route, enrich, review, approve, and escalate with ownership built in.',
  },
  {
    label: 'Cadence',
    title: 'Turn the build into management rhythm.',
    detail: 'Inspect adoption, conversion, exceptions, and margin impact before expanding.',
  },
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
            Where AI earns a place in the operating cadence.
          </h1>
          <div className="mt-8 grid max-w-4xl gap-px overflow-hidden border border-bone/15 bg-bone/15 sm:grid-cols-4">
            {useCaseLegend.map(([label, detail]) => (
              <div key={label} className="bg-forge-black/55 p-4 backdrop-blur-sm">
                <p className="overline text-[10px] text-brass-light">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map My First Build <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="#use-case-grid">Review Use Cases</Link>
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
              <p className="overline">High-Value Work</p>
              <h2 className="mt-6 text-display">
                Built around the problems that drain growth, speed, and margin.
              </h2>
            </div>
            <p className="mt-8 text-body-lg text-warm-gray lg:col-span-6 lg:col-start-7 lg:mt-0">
              Each use case starts with a constraint your team can already name, then shows the
              workflow, review path, owner view, and first build that would change it.
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
                    <UseCaseCardVisual useCase={useCase} />
                  </div>
                  <div className="p-6 lg:p-7">
                    <p className="overline text-[10px]">{useCase.eyebrow}</p>
                    <h3 className="mt-2 text-h3 transition-colors group-hover:text-brass">
                      {useCase.title}
                    </h3>
                    <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">
                      {useCase.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-divider pt-5">
                      <span className="text-sm font-semibold text-anthracite">Open the build</span>
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
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="overline">Why These Use Cases Work</p>
              <h2 className="mt-6 text-display">
                AI gets valuable when it changes how the work is run.
              </h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <div className="grid overflow-hidden border border-divider bg-warm-white lg:grid-cols-3">
                {valueStages.map((stage, index) => (
                  <div
                    key={stage.label}
                    className="relative border-b border-divider p-6 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="overline text-[10px]">{stage.label}</p>
                      <span className="metric text-xs text-brass">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-8 text-h3">{stage.title}</h3>
                    <p className="mt-4 text-body-sm leading-relaxed text-warm-gray">
                      {stage.detail}
                    </p>
                    {index < valueStages.length - 1 ? (
                      <ArrowRight className="absolute right-5 bottom-5 hidden h-4 w-4 text-brass lg:block" />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Business trigger', 'Human review', 'Field feedback'].map((control) => (
                  <div key={control} className="border-t border-divider pt-4">
                    <p className="text-sm font-semibold text-anthracite">{control}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section noise-texture py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Find the first AI build worth shipping.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Start with the work already slowing the business down. We will map the growth, speed,
            quality, service, and margin opportunities worth building first.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map My First Build <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
