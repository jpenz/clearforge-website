import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { adoptionGap } from '@/data/homepage';

/**
 * The Adoption Gap — the problem beat between proof marquee and product
 * catalog. Names the failure modes (pilot purgatory / adoption gap /
 * benefits void) and pairs each with the ClearForge counter. This is the
 * differentiator section: adoption is staffed, not hoped for.
 */
export function AdoptionGap() {
  return (
    <section className="border-b border-divider bg-warm-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="overline">{adoptionGap.eyebrow}</p>
              <h2 className="mt-5 text-display max-w-3xl">
                {adoptionGap.headlineLead}{' '}
                <span className="display-accent">{adoptionGap.headlineAccent}</span>.
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{adoptionGap.lede}</p>
          </div>
        </SectionReveal>

        {/* Stat rail */}
        <StaggerReveal className="mt-12 grid gap-6 border-y border-divider py-7 sm:grid-cols-3">
          {adoptionGap.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3 sm:block">
              <MetricCounter value={s.value} className="metric-lg text-brass" />
              <p className="mt-0 text-body-sm text-warm-gray sm:mt-2">{s.label}</p>
            </div>
          ))}
        </StaggerReveal>

        {/* Failure modes → our counter */}
        <StaggerReveal className="mt-10 grid gap-8 lg:grid-cols-3">
          {adoptionGap.failures.map((f, i) => (
            <div key={f.k}>
              <p className="metric text-[11px] uppercase tracking-[0.16em] text-warm-gray">
                FAILURE-{String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-h4 text-anthracite">{f.k}</h3>
              <p className="mt-2 text-body-sm text-warm-gray">{f.pain}</p>
              <div className="mt-3 border-l-2 border-brass pl-3.5">
                <p className="text-body-sm text-anthracite">{f.counter}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>

        {/* The Adoption Mile™ bar */}
        <SectionReveal animation="fade-up" className="mt-12">
          <div className="flex flex-col items-baseline gap-2 rounded-[12px] border border-brass/40 bg-parchment px-6 py-5 sm:flex-row sm:gap-4">
            <span className="metric text-[11px] uppercase tracking-[0.16em] text-brass">
              The Adoption Mile™
            </span>
            <p className="text-body-sm text-anthracite">
              <span className="metric text-brass">{adoptionGap.bar.stat}</span>{' '}
              {adoptionGap.bar.label}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
