import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionReveal } from '@/components/home/homepage-animations';
import { selectedWork as work } from '@/data/homepage';

/**
 * Selected work — real industrial-manufacturer case study. ~1.05/1 split:
 * text body + 3-metric strip left, dark visualization panel (heatmap) right.
 */
export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 bg-recessed py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionReveal animation="fade-up">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="overline">{work.eyebrow}</p>
              <h2 className="mt-5 text-display">
                {work.headline[0]}
                <br />
                {work.headline[1]}
              </h2>
            </div>
            <p className="text-body-lg text-warm-gray">{work.lede}</p>
          </div>
        </SectionReveal>

        <SectionReveal animation="scale-up" className="mt-12 lg:mt-16">
          <div className="grid border border-divider lg:grid-cols-[1.05fr_1fr]">
            {/* Body */}
            <div className="flex flex-col gap-5 bg-warm-white p-7 sm:p-10 lg:p-14">
              <p className="overline">{work.sector}</p>
              <h3 className="text-h2 text-anthracite">{work.body}</h3>
              <div className="mt-2 grid grid-cols-3 gap-4 border-t border-divider pt-7">
                {work.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="metric text-2xl text-brass sm:text-3xl">{m.value}</div>
                    <p className="mt-2 text-xs leading-snug text-warm-gray">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Link
                  href={`/case-studies/${work.caseSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-colors hover:text-brass-hover"
                >
                  Read the full case study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Viz panel */}
            <div className="dark-section flex flex-col justify-between gap-6 border-t border-divider p-7 sm:p-10 lg:border-l lg:border-t-0 lg:border-divider-dark">
              <div className="flex justify-between metric text-[11px] uppercase tracking-[0.16em] text-stone">
                <span>{work.vizTopLeft}</span>
                <span>{work.vizTopRight}</span>
              </div>
              <CaseHeatmap />
              <div className="flex justify-between metric text-[11px] uppercase tracking-[0.12em] text-stone">
                <span>{work.vizBottomLeft}</span>
                <span className="text-brass-light">● LIVE</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/** Deterministic value-pool heatmap (SSR-safe seeded pseudo-random). */
function CaseHeatmap() {
  const seed = (i: number) => {
    const x = Math.sin(i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const cells: number[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      cells.push((seed(r * 7 + c)) ** 1.6);
    }
  }
  return (
    <div className="grid grid-cols-7 gap-1">
      {cells.map((v, i) => {
        const accent = v > 0.78;
        const bg = accent
          ? `rgba(77, 141, 232, ${(0.35 + v * 0.6).toFixed(3)})`
          : `rgba(242, 239, 232, ${(0.05 + v * 0.16).toFixed(3)})`;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static deterministic grid
            key={i}
            style={{ aspectRatio: '1.4', background: bg, border: '1px solid rgba(242,239,232,0.06)' }}
          />
        );
      })}
    </div>
  );
}
