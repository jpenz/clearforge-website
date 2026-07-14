import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BookCallButton } from '@/components/booking/book-call';
import { SectionReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';
import { charcoal } from '@/data/homepage';

/**
 * The one dark band per page — credibility + final CTA. Charcoal, noise,
 * ember-light accents, stats in DM Mono.
 */
export function CharcoalBand() {
  return (
    <section className="dark-section noise-texture relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <SectionReveal animation="fade-up">
            <p className="overline">{charcoal.eyebrow}</p>
            <h2 className="mt-5 text-display text-bone">
              {charcoal.headlineLead}{' '}
              <span className="display-accent">{charcoal.headlineAccent}</span>
              {charcoal.headlineTail}
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-stone">{charcoal.copy}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button size="lg" asChild>
                <Link href={charcoal.primaryCta.href} data-analytics="home_charcoal_primary">
                  {charcoal.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <BookCallButton size="lg" variant="outline-light" analytics="home_charcoal_book_call">
                {charcoal.secondaryCta.label}
              </BookCallButton>
            </div>
          </SectionReveal>

          <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-divider-dark lg:pl-14">
            {charcoal.stats.map((s) => (
              <div key={s.label} className="border-b border-divider-dark pb-5 last:border-b-0">
                <MetricCounter value={s.value} className="metric-lg text-brass-light" />
                <p className="mt-2 text-body-sm text-stone">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
