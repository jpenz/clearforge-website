'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Simulated Forge Intelligence run — the flagship homepage band's product
 * surface. Plays once on first viewport entry as a pure state machine
 * (timeouts + CSS transitions; no animation libraries). Content is a real
 * diagnostic output, anonymized. Reduced-motion or replay renders the
 * completed state instantly.
 */

const DOMAIN = 'specialty-distributor.com';
const PROGRESS = [
  'Fetching specialty-distributor.com…',
  'Read homepage · 179 words of signal',
  'Drafting the diagnostic…',
];
const THESIS = [
  {
    k: 'The gap',
    v: 'Manual will-call and phone ordering creates inventory blind spots and reactive restocking across a perishable, high-SKU portfolio.',
  },
  {
    k: "What we'd build",
    v: 'A demand-forecasting agent that ingests order history and seasonality to recommend weekly buys and flag overstock risk by SKU.',
  },
  {
    k: 'The ambition',
    v: 'Buyers operate from a live replenishment dashboard — cutting emergency buys and shrink at the same time.',
  },
];

// step: 0 idle · 1..n typing · then progress lines · then fields · done
const TYPE_MS = 45;
const STEP: Record<string, number> = {
  progress1: 600,
  progress2: 1350,
  progress3: 2050,
  band: 2900,
  title: 3350,
  field0: 3800,
  field1: 4400,
  field2: 5000,
  benefit: 5600,
  done: 6100,
};

export function ForgeIntelDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [at, setAt] = useState(0); // ms into the run; Infinity = completed
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(DOMAIN);
      setAt(Number.POSITIVE_INFINITY);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        io.disconnect();
        // typewriter
        DOMAIN.split('').forEach((_, i) => {
          timers.push(setTimeout(() => setTyped(DOMAIN.slice(0, i + 1)), i * TYPE_MS));
        });
        const typeDone = DOMAIN.length * TYPE_MS + 250;
        for (const ms of Object.values(STEP)) {
          timers.push(setTimeout(() => setAt((prev) => Math.max(prev, ms)), typeDone + ms));
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      for (const t of timers) clearTimeout(t);
    };
  }, []);

  const show = (key: keyof typeof STEP) => at >= STEP[key];
  const reveal = (on: boolean) =>
    `transition-all duration-500 ${on ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`;

  return (
    <div ref={ref} className="browser-chrome w-full" aria-hidden="true">
      <div className="browser-chrome__bar">
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__url">clearforge.ai/agent</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-brass ${started.current && !show('done') ? 'animate-pulse' : ''}`}
          />
          <span className="metric text-[10px] uppercase tracking-[0.14em] text-warm-gray">
            {show('done') ? 'Complete' : 'Sample run'}
          </span>
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="metric text-[11px] uppercase tracking-[0.14em] text-brass">
            Forge Intelligence™
          </span>
          <span className="metric text-[11px] text-warm-gray">anonymized real run</span>
        </div>

        {/* input being typed */}
        <div className="mt-4 flex items-center rounded-[6px] border border-divider bg-parchment">
          <span className="metric select-none pl-3 text-xs text-warm-gray">https://</span>
          <span className="metric py-2.5 pl-1 pr-0.5 text-sm text-anthracite">{typed}</span>
          {!show('progress1') && (
            <span className="h-4 w-px animate-pulse bg-brass" aria-hidden="true" />
          )}
        </div>

        {/* progress rail */}
        <div className="mt-3 min-h-[3.9rem] space-y-1 border-l border-divider pl-3.5">
          {PROGRESS.map((label, i) => {
            const on = show(`progress${i + 1}` as keyof typeof STEP);
            return (
              <p
                key={label}
                className={`metric text-[11px] leading-relaxed ${reveal(on)} ${
                  on && !show('band') && i === 2 ? 'text-brass' : 'text-warm-gray'
                }`}
              >
                {label}
              </p>
            );
          })}
        </div>

        {/* thesis fills in */}
        <div className={`mt-2 border-t border-divider pt-4 ${reveal(show('band'))}`}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="metric text-2xl text-anthracite sm:text-3xl">Likely 35–50</span>
            <span className="text-xs text-warm-gray">a specialty food distributor</span>
          </div>
          <p
            className={`metric mt-3 text-[11px] uppercase tracking-[0.14em] text-brass ${reveal(show('title'))}`}
          >
            Priority play — Order &amp; Inventory Intelligence
          </p>
          <dl className="mt-2.5 space-y-2">
            {THESIS.map((row, i) => (
              <div key={row.k} className={reveal(show(`field${i}` as keyof typeof STEP))}>
                <dt className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                  {row.k}
                </dt>
                <dd className="mt-0.5 text-body-sm leading-snug text-anthracite">{row.v}</dd>
              </div>
            ))}
          </dl>
          <div className={`mt-3 border-l-2 border-brass pl-3 ${reveal(show('benefit'))}`}>
            <p className="text-body-sm font-semibold text-brass">15–30% less spoilage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
