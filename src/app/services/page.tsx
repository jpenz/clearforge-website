import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal } from '@/components/home/section-reveal';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Services | ClearForge',
  description:
    'AI strategy, design & build, managed operations, and legacy modernization. Choose your point on the AI journey.',
  path: '/services',
  keywords: ['AI consulting services', 'AI strategy', 'AI agents', 'managed AI operations'],
});

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">Services</p>
          <h1
            className="mt-4 max-w-3xl text-4xl text-text-primary sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Choose your point on the journey
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            Whether you need clarity on where to focus, production AI systems, or ongoing operations
            — we meet you where you are and build from there.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => {
        const isDark = i % 2 === 1;
        return (
          <SectionReveal key={service.slug}>
            <section
              id={
                service.slug === 'growth-strategy-diagnosis'
                  ? 'strategy'
                  : service.slug === 'ai-design-build'
                    ? 'build'
                    : service.slug === 'managed-ai-operations'
                      ? 'operations'
                      : service.slug === 'legacy-system-modernization'
                        ? 'modernization'
                        : service.slug
              }
              className={isDark ? 'bg-bg-deep py-20 lg:py-28' : 'bg-bg-light py-20 lg:py-28'}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                  {/* Left: Info */}
                  <div>
                    <span className={`metric text-sm ${!isDark ? 'text-accent-dark' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2
                      className={`mt-3 text-3xl sm:text-4xl ${isDark ? 'text-text-primary' : 'text-text-on-light'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {service.title}
                    </h2>
                    <p className={`mt-2 text-lg ${isDark ? 'text-accent' : 'text-accent-dark'}`}>
                      {service.tagline}
                    </p>
                    <p
                      className={`mt-4 text-base leading-relaxed ${isDark ? 'text-text-secondary' : 'text-text-on-light-sub'}`}
                    >
                      {service.description}
                    </p>

                    <div
                      className={`mt-8 border-t pt-6 ${isDark ? 'border-border-subtle' : 'border-border-light'}`}
                    >
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isDark ? 'text-text-muted' : 'text-text-on-light-muted'}`}
                      >
                        Ideal Client
                      </p>
                      <p
                        className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-on-light-sub'}`}
                      >
                        {service.idealClient}
                      </p>
                    </div>
                  </div>

                  {/* Right: Outcomes + Deliverables */}
                  <div>
                    <div
                      className={`grid grid-cols-2 gap-px ${isDark ? 'bg-border-subtle' : 'bg-border-light'}`}
                    >
                      {service.outcomes.map((o) => (
                        <div
                          key={o.description}
                          className={`p-6 ${isDark ? 'bg-bg-deep' : 'bg-bg-light'}`}
                        >
                          <p
                            className={`metric text-xl font-bold ${!isDark ? 'text-accent-dark' : ''}`}
                          >
                            {o.metric}
                          </p>
                          <p
                            className={`mt-1 text-sm ${isDark ? 'text-text-muted' : 'text-text-on-light-muted'}`}
                          >
                            {o.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDark ? 'text-text-muted' : 'text-text-on-light-muted'}`}
                      >
                        Deliverables
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.map((d) => (
                          <li
                            key={d}
                            className={`flex items-start gap-3 text-sm ${isDark ? 'text-text-secondary' : 'text-text-on-light-sub'}`}
                          >
                            <span
                              className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${isDark ? 'bg-accent' : 'bg-accent-dark'}`}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>
        );
      })}

      {/* CTA */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2
            className="text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Not sure which service fits?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Tell us about your situation. We&apos;ll recommend the right starting point — or tell
            you honestly if we&apos;re not the right fit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/assessment">Take the Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
