import { SectionReveal } from '@/components/home/homepage-animations';
import { credibility } from '@/data/homepage';

/**
 * Credibility band — 3-col founder section: eyebrow + heading left,
 * one-paragraph copy middle, CV timeline right. Top border rule.
 * Founder facts reconciled to the established repo narrative.
 */
export function CredibilityBand() {
  return (
    <section id="firm" className="scroll-mt-24 border-t border-divider bg-parchment py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.3fr_0.9fr] lg:gap-16">
            <div>
              <p className="overline">{credibility.eyebrow}</p>
              <h3 className="mt-4 text-h1 text-anthracite">
                {credibility.headline[0]}
                <br />
                {credibility.headline[1]}
              </h3>
            </div>
            <p className="max-w-[52ch] text-body-lg text-warm-gray lg:self-center">
              {credibility.copy}
            </p>
            <div className="flex flex-col justify-center gap-3 lg:border-l lg:border-divider lg:pl-10">
              {credibility.cv.map((row) => (
                <div key={row.label} className="flex items-baseline gap-4 border-b border-divider pb-3">
                  <span className="metric w-14 shrink-0 text-xs text-brass">{row.yr}</span>
                  <span className="text-body-sm text-anthracite">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
