import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { hero, heroProof } from '@/data/homepage';

/**
 * V9 Hero — tightened, technical-confident. Light (parchment) section with a
 * dark production-readiness scorecard proof card on the right. One dominant
 * CTA (the readiness score); the secondary is a quiet link.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(2rem,5vw,4.75rem)]">
          {/* Left — headline + CTAs */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2.5 overline">
              <span className="inline-block h-1.5 w-1.5 bg-brass" aria-hidden="true" />
              {hero.eyebrow}
            </div>
            <h1
              className="mt-6 text-anthracite"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 6.4vw, 5.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                fontWeight: 600,
              }}
            >
              {hero.headline[0]}
              <br />
              ROI you can <span className="text-brass">prove.</span>
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-warm-gray">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button size="lg" asChild>
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>

          {/* Right — production-readiness proof card */}
          <HeroProof />
        </div>

        {/* Stat strip */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-2 border-t border-divider lg:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-divider px-0 py-6 sm:px-6 ${i < hero.stats.length - 1 ? 'lg:border-r' : ''} ${
                i % 2 === 0 ? 'pr-6' : 'border-l border-divider pl-6 lg:border-l-0 lg:pl-6'
              }`}
            >
              <div className="metric text-2xl text-anthracite sm:text-[1.75rem]">{s.value}</div>
              <p className="mt-2 text-body-sm text-warm-gray">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroProof() {
  return (
    <aside
      className="dark-section border border-divider-dark p-6 sm:p-8 animate-fade-in-up delay-2"
      aria-label="Sample AI production-readiness scorecard"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-stone metric">
        <span>Production-readiness</span>
        <span>{heroProof.version}</span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="metric text-bone" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', lineHeight: 1 }}>
          {heroProof.score}
        </span>
        <span className="metric text-lg text-stone">/ {heroProof.outOf}</span>
        <span className="ml-auto metric text-[10px] uppercase tracking-[0.14em] text-brass-light">
          {heroProof.tag}
        </span>
      </div>

      {/* Top meter */}
      <div className="mt-4 h-1.5 w-full overflow-hidden bg-divider-dark">
        <div className="h-full bg-brass" style={{ width: `${heroProof.score}%` }} />
      </div>

      {/* Sub-score rows */}
      <div className="mt-7 space-y-4">
        {heroProof.lines.map((line) => (
          <div key={line.k} className="flex items-center gap-4">
            <span className="w-28 shrink-0 text-body-sm text-stone">{line.k}</span>
            <span className="h-1 flex-1 overflow-hidden bg-divider-dark">
              <span className="block h-full bg-brass" style={{ width: `${line.w}%` }} />
            </span>
            <span className="metric w-10 shrink-0 text-right text-body-sm text-bone">{line.v}</span>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-divider-dark pt-4 text-xs text-stone">
        <span>{heroProof.footLeft}</span>
        <span className="text-brass-light">{heroProof.footRight}</span>
      </div>
    </aside>
  );
}
