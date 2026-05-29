import { SectionReveal } from '@/components/home/homepage-animations';
import { productionGap as gap } from '@/data/homepage';

/**
 * Production Gap — the thesis. Section head + 2-col body: left is a bordered
 * panel of 4 progress bars ending in the "68 pts" delta; right is 3 eyebrow-led
 * mini essays.
 */
export function ProductionGap() {
  return (
    <section id="gap" className="scroll-mt-24 bg-recessed py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section head */}
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="overline">{gap.eyebrow}</p>
              <h2 className="mt-5 text-display">
                {gap.headline[0]}
                <br />
                {gap.headline[1]}
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{gap.lede}</p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left — bordered bar panel */}
          <SectionReveal animation="slide-left">
            <div className="border border-divider bg-warm-white p-6 sm:p-9">
              <div className="space-y-7">
                {gap.bars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-body-sm text-warm-gray">{bar.label}</span>
                      <span
                        className={`metric text-lg ${bar.accent ? 'text-brass' : 'text-anthracite'}`}
                      >
                        {bar.display}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden bg-recessed">
                      <div
                        className={`h-full ${bar.accent ? 'bg-brass' : 'bg-anthracite/70'}`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-baseline justify-between border-t border-divider pt-6">
                <span className="overline">{gap.delta.label}</span>
                <span className="metric text-3xl text-brass sm:text-4xl">{gap.delta.value}</span>
              </div>
            </div>
          </SectionReveal>

          {/* Right — mini essays */}
          <SectionReveal animation="slide-right">
            <ul className="grid gap-7">
              {gap.essays.map((essay) => (
                <li key={essay.eyebrow}>
                  <p className="overline">{essay.eyebrow}</p>
                  <p className="mt-1.5 text-body text-warm-gray">{essay.body}</p>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
