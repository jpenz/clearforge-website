'use client';

import { useEffect, useRef, useState } from 'react';
import { MetricCounter } from '@/components/home/metric-counter';

/**
 * Scorecard product surface for the homepage band — a five-pillar readout
 * whose bars fill on first viewport entry (CSS transitions, IO-triggered).
 */

const PILLARS = [
  { k: 'Ambition & value case', w: 62 },
  { k: 'Workflow clarity', w: 48 },
  { k: 'Data path', w: 71 },
  { k: 'Controls & integration', w: 55 },
  { k: 'Adoption cadence', w: 66 },
];

export function ScorecardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setOn(true);
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="browser-chrome w-full" aria-hidden="true">
      <div className="browser-chrome__bar">
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__url">clearforge.ai/scorecard</span>
        <span className="ml-auto metric text-[10px] uppercase tracking-[0.14em] text-warm-gray">
          Sample readout
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="metric text-3xl text-anthracite sm:text-4xl">
            {on ? <MetricCounter value="61" className="" duration={1.4} /> : '0'}
            <span className="text-base text-warm-gray">/100</span>
          </span>
          <span className="metric text-[11px] uppercase tracking-[0.14em] text-brass">
            Developing
          </span>
        </div>

        <div className="mt-5 space-y-3.5">
          {PILLARS.map((p, i) => (
            <div key={p.k}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                  {p.k}
                </span>
                <span className="metric text-[11px] text-anthracite">{p.w}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-divider">
                <div
                  className="h-full rounded-full bg-brass transition-[width] duration-700 ease-out"
                  style={{ width: on ? `${p.w}%` : '0%', transitionDelay: `${i * 120}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="metric mt-5 border-t border-divider pt-4 text-[10px] uppercase tracking-[0.12em] text-warm-gray">
          Weakest pillar → workflow clarity · recommended path → Forge Sprint
        </p>
      </div>
    </div>
  );
}
