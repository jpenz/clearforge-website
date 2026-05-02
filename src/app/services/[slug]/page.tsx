import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getServiceBySlug, services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: `${service.title} — ClearForge`,
    description: service.tagline,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Headline outcome — displayed in the hero as a visual anchor
  const heroStat = service.outcomes[0];

  return (
    <>
      {/* ── Hero — atmospheric bg + two-column with headline outcome ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={service.heroBg}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          >
            <source src={`/videos/${slug}.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/40 to-forge-black/60" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-end">
            {/* Left: headline copy + CTA */}
            <div className="lg:col-span-7">
              <p className="overline">{service.title}</p>
              <h1
                className="mt-6 text-display max-w-3xl text-bone"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                {service.tagline}
              </h1>
              <p className="mt-6 max-w-xl text-body-lg text-stone">{service.description}</p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: headline stat — visual anchor, magazine-style pull-quote */}
            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <div className="border-l border-brass/40 pl-8 lg:pl-10">
                <p className="overline text-brass-light text-[10px]">Typical Outcome</p>
                <p className="mt-4 font-display text-[4rem] leading-[0.92] text-brass-light sm:text-[5.5rem] lg:text-[7rem]">
                  {heroStat.value}
                </p>
                <p className="mt-4 text-h3 text-bone">{heroStat.label}</p>
                <p className="mt-3 text-body-sm text-stone max-w-xs">{heroStat.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Outcomes — 4 up with value / label / description ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Expected Outcomes</p>
          <h2 className="mt-6 text-display max-w-2xl">What this looks like in practice.</h2>
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {service.outcomes.map((o) => (
              <div key={o.label} className="border-t border-divider pt-6">
                <p className="metric text-[2rem] font-medium leading-none text-brass sm:text-[2.4rem] lg:text-[2.75rem]">
                  {o.value}
                </p>
                <p className="mt-3 text-body font-semibold text-anthracite">{o.label}</p>
                <p className="mt-2 text-body-sm text-warm-gray leading-relaxed">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Deliverables</p>
              <h2 className="mt-6 text-display">What you get.</h2>
              <p className="mt-6 text-body text-warm-gray max-w-sm">
                Every engagement ends with a working system in production — not a strategy deck on a
                shelf.
              </p>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <ul className="space-y-0">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="flex items-start gap-5 border-t border-divider py-6">
                    <span
                      className="text-brass shrink-0"
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono, monospace)',
                        fontSize: '0.875rem',
                        fontVariantNumeric: 'tabular-nums',
                        lineHeight: 1.6,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-anthracite leading-relaxed">{d}</p>
                  </li>
                ))}
                <li className="border-t border-divider" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow — editorial numbered flow with connecting rule ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">How It Works</p>
          <h2
            className="mt-6 text-display max-w-3xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            From kickoff to results.
          </h2>

          {/* Horizontal rule connecting the 4 phases on desktop */}
          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-brass/30" />

            <div className="grid gap-12 lg:gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {service.workflow.map((w, i) => (
                <div key={w.phase} className="relative lg:pr-8">
                  {/* Node marker on the rule */}
                  <div className="hidden lg:flex absolute top-[2rem] left-0 w-5 h-5 items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brass ring-4 ring-forge-black" />
                  </div>

                  <div className="lg:pl-10">
                    <p className="metric text-xs uppercase text-brass-light">
                      {String(i + 1).padStart(2, '0')} · {w.phase}
                    </p>
                    <h3 className="mt-4 font-display text-[1.5rem] leading-[1.1] text-bone sm:text-[1.75rem] lg:text-[2rem]">
                      {w.title}
                    </h3>
                    <p className="mt-3 text-body-sm text-stone leading-relaxed">{w.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ideal Client + final CTA ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Ideal Client</p>
              <h2 className="mt-6 text-display">Is this right for you?</h2>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">{service.idealClient}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/discover">Generate AI Value Map</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
