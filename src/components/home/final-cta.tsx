import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { finalCta } from '@/data/homepage';

/**
 * Final CTA — full-bleed dark band. Two-column: headline left, sub + buttons
 * right. Both routes point at the assessment/scorecard flow (hero parity).
 */
export function FinalCta() {
  return (
    <section id="score" className="dark-section scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="overline">{finalCta.eyebrow}</p>
            <h2 className="mt-5 text-display text-bone">
              {finalCta.headline[0]}
              <br />
              Your <span className="text-brass-light">production-readiness</span> score in four
              minutes.
            </h2>
          </div>
          <div>
            <p className="text-body-lg text-stone">{finalCta.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button size="lg" asChild>
                <Link href={finalCta.primaryCta.href}>
                  {finalCta.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href={finalCta.secondaryCta.href}>{finalCta.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
