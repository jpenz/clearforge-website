import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { blueprints, getBlueprintBySlug } from '@/data/blueprints';
import { breadcrumbJsonLd, createMetadata, serviceJsonLd } from '@/lib/metadata';

export function generateStaticParams() {
  return blueprints
    .filter((blueprint) => blueprint.slug !== 'cybersecurity-technology-company')
    .map((blueprint) => ({ slug: blueprint.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint || blueprint.slug === 'cybersecurity-technology-company') return {};

  return createMetadata({
    title: `${blueprint.title} | AI Build Blueprint`,
    description: blueprint.description,
    path: `/blueprints/${blueprint.slug}`,
    keywords: ['AI build blueprint', blueprint.title, blueprint.audience, blueprint.firstWorkflow],
  });
}

export default async function BlueprintDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint || blueprint.slug === 'cybersecurity-technology-company') notFound();

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blueprints', path: '/blueprints' },
    { name: blueprint.title, path: `/blueprints/${blueprint.slug}` },
  ]);

  const serviceLd = serviceJsonLd({
    title: blueprint.title,
    description: blueprint.description,
    path: `/blueprints/${blueprint.slug}`,
  });

  return (
    <>
      <JsonLdScript data={breadcrumbLd} />
      <JsonLdScript data={serviceLd} />

      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,127,95,0.2),transparent_34%),linear-gradient(125deg,rgba(10,15,30,1),rgba(10,15,30,0.82))]" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="overline">{blueprint.eyebrow}</p>
              <span className="border border-bone/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                {blueprint.type}
              </span>
            </div>
            <h1 className="mt-6 text-display text-bone">{blueprint.h1}</h1>
            <p className="mt-7 max-w-2xl text-body-lg text-stone">{blueprint.description}</p>
            <div className="mt-8 flex gap-3 border-t border-bone/15 pt-5">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-brass-light" />
              <p className="max-w-2xl text-body-sm leading-relaxed text-stone">
                {blueprint.truthLabel}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/discover">
                  Generate AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href="/contact">Book a Diagnostic Call</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-4">
            {[
              ['First workflow', blueprint.firstWorkflow],
              ['Owner', blueprint.operatingOwner],
              ['Window', blueprint.buildWindow],
              ['Proof standard', blueprint.proofStandard],
            ].map(([label, value]) => (
              <div key={label} className="bg-forge-black/70 p-5">
                <p className="overline text-[10px] text-brass-light">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-bone">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[0.38fr_0.62fr] lg:px-10">
          <div>
            <p className="overline">Decision Frame</p>
            <h2 className="mt-5 text-display">What the first build has to answer.</h2>
          </div>
          <div className="grid gap-4">
            {[
              ['Audience', blueprint.audience],
              ['Situation', blueprint.situation],
              ['Business question', blueprint.businessQuestion],
            ].map(([label, value]) => (
              <div key={label} className="border border-divider bg-warm-white p-6">
                <p className="overline text-[10px]">{label}</p>
                <p className="mt-3 text-body text-anthracite">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Build Sequence</p>
          <h2 className="mt-6 max-w-3xl text-display text-bone">
            From idea to a managed operating workflow.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden border border-bone/15 bg-bone/10 lg:grid-cols-3">
            {blueprint.buildSequence.map((step, index) => (
              <div key={step.phase} className="bg-forge-black/50 p-6 lg:p-8">
                <p className="metric text-sm text-brass-light">
                  {String(index + 1).padStart(2, '0')} · {step.phase}
                </p>
                <h3 className="mt-5 text-h3 text-bone">{step.title}</h3>
                <p className="mt-4 text-body-sm leading-relaxed text-stone">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div>
              <p className="overline">Operating System</p>
              <h2 className="mt-6 text-display">What ClearForge would put around the work.</h2>
              <p className="mt-5 text-body text-warm-gray">
                These layers keep the build tied to a workflow, not a demo. The goal is an owner
                cadence people can actually run.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-2">
              {blueprint.systemLayers.map((layer) => (
                <div key={layer.label} className="bg-warm-white p-6">
                  <h3 className="text-h4">{layer.label}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{layer.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-divider bg-recessed py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="overline">Controls</p>
            <h2 className="mt-6 text-display">Where humans stay in control.</h2>
            <div className="mt-8 grid gap-3">
              {blueprint.controlPoints.map((control) => (
                <div key={control} className="flex gap-3 border-t border-divider pt-4">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brass" />
                  <p className="text-body-sm leading-relaxed text-anthracite">{control}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="overline">Evidence To Bring</p>
            <h2 className="mt-6 text-display">What makes the diagnostic useful.</h2>
            <div className="mt-8 grid gap-3">
              {blueprint.evidenceToBring.map((item) => (
                <div key={item} className="border border-divider bg-warm-white p-4">
                  <p className="text-body-sm leading-relaxed text-anthracite">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Value Signals</p>
          <h2 className="mt-6 max-w-3xl text-display">What leaders should inspect after launch.</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-divider bg-divider lg:grid-cols-3">
            {blueprint.valueSignals.map((signal) => (
              <div key={signal.label} className="bg-warm-white p-6">
                <p className="overline text-[10px]">{signal.label}</p>
                <p className="mt-4 metric text-2xl text-brass">{signal.metric}</p>
                <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[0.38fr_0.62fr] lg:px-10">
          <div>
            <p className="overline">Related Paths</p>
            <h2 className="mt-6 text-display text-bone">Keep moving from example to decision.</h2>
          </div>
          <div className="border-t border-divider-dark">
            {blueprint.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-8 border-b border-divider-dark py-6"
              >
                <span className="text-h3 text-bone transition-colors group-hover:text-brass-light">
                  {link.label}
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-stone transition-all group-hover:translate-x-1 group-hover:text-brass-light" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
