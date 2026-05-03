import { ArrowRight, CheckCircle2, Gauge, Layers3, Shield, Workflow } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { forgeProducts } from '@/data/forge-products';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Custom AI Strategy and Build Services | ClearForge',
  description:
    'ClearForge selects workflows, sets baselines, builds custom agents, and trains teams into a measurable AI operating model.',
  path: '/services',
});

const capabilityRails = [
  {
    icon: Gauge,
    label: 'Decide',
    title: 'Choose the workflow',
    points: ['Value map', 'Readiness check', 'Baseline metric'],
  },
  {
    icon: Workflow,
    label: 'Build',
    title: 'Ship the system',
    points: ['Agent logic', 'Integrations', 'Controls'],
  },
  {
    icon: Layers3,
    label: 'Operate',
    title: 'Make it stick',
    points: ['Owner cadence', 'Training', 'Value reviews'],
  },
];

const comparisonRows = [
  {
    area: 'Workflow selection',
    platform: 'You choose the use case and success metric',
    clearforge: 'We size, score, and select the workflow with leadership',
  },
  {
    area: 'Implementation',
    platform: 'Configured tools and generic assistants',
    clearforge: 'Custom agents, integrations, controls, and dashboards',
  },
  {
    area: 'Adoption',
    platform: 'Enablement is usually separate',
    clearforge: 'Training, runbooks, owner cadence, and post-launch review',
  },
];

const guaranteeItems = [
  'Approved workflow',
  'Baseline metrics',
  'Build plan',
  'Leadership readout',
];

export default function ServicesPage() {
  return (
    <>
      {/* — Hero with atmospheric bg — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-forge-progression.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeIn>
            <p className="overline">How We Work</p>
            <h1
              className="mt-6 text-display max-w-3xl text-bone"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              Custom AI, built around how your business actually runs.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-xl text-body-lg text-stone">
              ClearForge combines strategy and technology in one accountable engagement: choose the
              workflow, size the business case, build the custom system, and train the team into the
              new way of working.
            </p>
            <div className="mt-10 grid max-w-3xl gap-px overflow-hidden border border-divider-dark bg-divider-dark sm:grid-cols-3">
              {['Workflow first', 'Custom build', 'Adoption owned'].map((item) => (
                <div key={item} className="bg-forge-black/70 px-5 py-4">
                  <p className="text-body-sm font-medium text-bone">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* — Capability Rails — */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="overline">Operating Model</p>
              <h2 className="mt-6 text-display max-w-xl">
                Strategy, engineering, and adoption move together.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-3">
                {capabilityRails.map((rail) => {
                  const Icon = rail.icon;
                  return (
                    <div key={rail.label} className="bg-parchment p-6 lg:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <p className="overline text-[10px]">{rail.label}</p>
                        <Icon className="h-5 w-5 text-brass" />
                      </div>
                      <h3 className="mt-5 text-h3">{rail.title}</h3>
                      <ul className="mt-6 space-y-3">
                        {rail.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-body-sm text-warm-gray"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brass" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Three Forge Products — editorial ruled-line — */}
      <section className="border-t border-divider bg-recessed py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="overline">Engagement Architecture</p>
              <h2 className="mt-6 text-display max-w-2xl">
                Three ways to move from ambition to production.
              </h2>
            </div>
            <p className="text-body text-warm-gray lg:col-span-4 lg:col-start-9">
              Pick the level of commitment that matches the decision in front of you.
            </p>
          </div>

          <Stagger
            className="mt-14 grid gap-px overflow-hidden border border-divider bg-divider lg:grid-cols-3"
            stagger={0.12}
          >
            {forgeProducts.map((product, i) => (
              <StaggerItem key={product.name}>
                <div
                  className={`relative h-full border-t-4 bg-parchment p-6 lg:p-8 ${
                    product.featured ? 'border-brass' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="metric text-sm text-brass">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {product.featured && <span className="overline text-[10px]">Most chosen</span>}
                  </div>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-[1.08] sm:text-[2rem]">
                    {product.name}
                  </h3>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span
                      className="metric text-3xl text-anthracite"
                      style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                    >
                      {product.price}
                    </span>
                    <span className="text-body-sm text-warm-gray">{product.period}</span>
                  </div>
                  <p className="mt-1 text-body-sm text-warm-gray">{product.timeline}</p>
                  <p className="mt-6 text-body text-warm-gray">{product.description}</p>
                  <ul className="mt-7 space-y-3">
                    {product.whatsIncluded.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-body-sm text-anthracite"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button variant={product.featured ? 'default' : 'secondary'} size="lg" asChild>
                      <Link href={product.href}>
                        {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* — All Services — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Capabilities</p>
          <h2 className="mt-6 text-display max-w-2xl">
            Four build lanes. One operating discipline.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-divider bg-divider lg:grid-cols-4">
            {services.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group bg-parchment p-6 transition-colors hover:bg-surface lg:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="metric text-sm text-brass">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowRight className="h-4 w-4 text-warm-gray transition-all duration-300 group-hover:translate-x-1 group-hover:text-brass" />
                </div>
                <h3 className="mt-8 text-h3 transition-colors group-hover:text-brass">
                  {svc.title}
                </h3>
                <p className="mt-3 text-body-sm text-warm-gray">{svc.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* — Platform vs. Partner — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="overline">Platform vs. Build Partner</p>
              <h2 className="mt-6 text-display text-bone max-w-xl">
                Platforms are ingredients. The working system has to be designed.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="overflow-hidden border border-divider-dark">
                <div className="grid grid-cols-3 border-b border-divider-dark bg-bone/5 px-4 py-3 text-body-sm font-medium text-stone sm:px-6">
                  <span>Decision</span>
                  <span>Typical platform</span>
                  <span>ClearForge</span>
                </div>
                {comparisonRows.map((row) => (
                  <div
                    key={row.area}
                    className="grid gap-3 border-b border-divider-dark px-4 py-5 last:border-b-0 sm:grid-cols-3 sm:px-6"
                  >
                    <p className="text-body-sm font-medium text-bone">{row.area}</p>
                    <p className="text-body-sm text-stone">{row.platform}</p>
                    <p className="text-body-sm text-brass-light">{row.clearforge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Guarantee — */}
      <section className="bg-parchment py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-10 border-y border-divider py-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Shield className="mb-6 h-8 w-8 text-brass" />
              <p className="overline">The ClearForge Guarantee</p>
              <h2 className="mt-6 text-display">Decision clarity, or your investment back.</h2>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-2">
                {guaranteeItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-parchment p-5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brass" />
                    <p className="text-body-sm font-medium text-anthracite">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-body text-warm-gray">
                If the Forge Diagnostic does not produce these assets in a form your leadership team
                can act on, we refund the investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">
            Ready to see where custom AI can move the business?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic gives you a clear picture of the selected workflow, system
            architecture, adoption path, and value assumptions before you commit to a build.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map the Workflow <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact">Book a 15-Min Diagnostic Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
