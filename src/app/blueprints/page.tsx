import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { blueprints } from '@/data/blueprints';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'AI Build Blueprints | ClearForge',
  description:
    'Explore ClearForge AI build blueprints: example operating systems, composite scenarios, and role proposals that show what custom AI could look like before a paid sprint.',
  path: '/blueprints',
  keywords: [
    'AI build blueprint',
    'AI workflow blueprint',
    'AI operating system examples',
    'custom AI examples',
  ],
});

const proofRules = [
  'Blueprints are labeled as role proposals, example builds, or composite scenarios.',
  'Real client outcomes stay in case studies. Example pages show what we would build and measure.',
  'Every blueprint names the first workflow, operating owner, control points, and evidence needed.',
];

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'ClearForge AI Build Blueprints',
  url: 'https://clearforge.ai/blueprints',
  description:
    'Example AI operating-system builds, composite scenarios, and role proposals from ClearForge.',
  hasPart: blueprints
    .filter((blueprint) => blueprint.slug !== 'cybersecurity-technology-company')
    .map((blueprint) => ({
      '@type': 'Service',
      name: blueprint.title,
      url: `https://clearforge.ai${blueprint.href}`,
      description: blueprint.description,
    })),
};

export default function BlueprintsPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blueprints', path: '/blueprints' },
  ]);

  return (
    <>
      <JsonLdScript data={collectionLd} />
      <JsonLdScript data={breadcrumbLd} />

      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,127,95,0.22),transparent_36%),linear-gradient(120deg,rgba(10,15,30,1),rgba(10,15,30,0.84))]" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">AI Build Blueprints</p>
          <h1 className="mt-6 max-w-4xl text-display text-bone">
            See what ClearForge would build before you fund a sprint.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            These pages translate common executive problems into concrete AI operating systems:
            first workflow, owner, controls, evidence, dashboard, and build path.
          </p>
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
      </section>

      <section className="border-b border-divider bg-warm-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[0.4fr_0.6fr] lg:px-10">
          <div>
            <p className="overline">Trust Standard</p>
            <h2 className="mt-4 text-h2">Useful examples without fake proof.</h2>
          </div>
          <div className="grid gap-3">
            {proofRules.map((rule) => (
              <div key={rule} className="flex gap-3 border-t border-divider pt-4">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-brass" />
                <p className="text-body-sm leading-relaxed text-anthracite">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Blueprint Library</p>
          <h2 className="mt-6 max-w-3xl text-display">
            Example builds for the workflows leaders usually want to fix first.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-divider bg-divider lg:grid-cols-2">
            {blueprints.map((blueprint) => (
              <Link
                key={blueprint.slug}
                href={blueprint.href}
                className="group bg-warm-white p-6 transition-colors hover:bg-white lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="overline text-[10px]">{blueprint.eyebrow}</p>
                    <h3 className="mt-3 text-h3 transition-colors group-hover:text-brass">
                      {blueprint.title}
                    </h3>
                  </div>
                  <span className="shrink-0 border border-divider px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm-gray">
                    {blueprint.type}
                  </span>
                </div>
                <p className="mt-5 text-body-sm leading-relaxed text-warm-gray">
                  {blueprint.description}
                </p>
                <div className="mt-6 grid gap-3 border-t border-divider pt-5 sm:grid-cols-3">
                  {[
                    ['First workflow', blueprint.firstWorkflow],
                    ['Owner', blueprint.operatingOwner],
                    ['Build window', blueprint.buildWindow],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="overline text-[9px]">{label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-anthracite">{value}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brass">
                  Open blueprint <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-20 lg:py-32">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <FileText className="h-6 w-6 text-brass-light" />
              <h2 className="mt-5 text-display text-bone">Turn a blueprint into your first map.</h2>
            </div>
            <div>
              <p className="text-body-lg text-stone">
                Pick the closest blueprint, then run the value map or book a diagnostic call. The
                first conversation should name the workflow, owner, baseline, data path, and
                controls before anyone talks about a build.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Name the workflow worth fixing',
                  'Confirm the owner and baseline',
                  'Map the data path and controls',
                  'Decide whether the first sprint is worth funding',
                ].map((item) => (
                  <div key={item} className="flex gap-3 border-t border-bone/15 pt-4">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brass-light" />
                    <p className="text-body-sm text-stone">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/scorecard">Run Diagnostic</Link>
                </Button>
                <Button size="lg" variant="outline-light" asChild>
                  <Link href="/contact">Book a Diagnostic Call</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
