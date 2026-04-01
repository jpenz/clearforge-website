import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { services, getServiceBySlug } from '@/data/services';
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="dark-section py-32 lg:py-48">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">{service.title}</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            {service.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            {service.description}
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Expected Outcomes</p>
          <h2 className="mt-6 text-display max-w-2xl">
            What this looks like in practice.
          </h2>
          <div className="mt-16 grid grid-cols-2 gap-12 lg:grid-cols-4">
            {service.outcomes.map((o) => (
              <div key={o.metric}>
                <p className="metric-lg text-brass">{o.metric}</p>
                <p className="mt-2 text-body-sm text-warm-gray">
                  {o.description}
                </p>
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
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              <ul className="space-y-6">
                {service.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="flex items-start gap-4 border-t border-divider pt-6"
                  >
                    <span className="metric text-sm text-brass">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-anthracite">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="bg-warm-white py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">How It Works</p>
          <h2 className="mt-6 text-display max-w-2xl">
            From kickoff to results.
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.workflow.map((w) => (
              <div key={w.phase} className="border-t border-divider pt-8">
                <p className="text-body-sm font-medium text-brass">
                  {w.phase}
                </p>
                <h3 className="mt-2 text-h3">{w.title}</h3>
                <p className="mt-3 text-body text-warm-gray">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ideal Client ── */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="overline">Ideal Client</p>
          <h2 className="mt-6 text-display">Is this right for you?</h2>
          <p className="mt-6 text-body-lg text-warm-gray">
            {service.idealClient}
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/contact">
                Schedule a Discussion <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
