'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { hero, heroSample } from '@/data/homepage';

/**
 * V9 Hero — live AI-readiness analyzer. Visitor enters their URL; we fetch
 * their homepage and return a REAL readiness band + 3 value-chain opportunities
 * (one fast Claude call via /api/hero-analyze). The card on the right shows a
 * clearly-labeled SAMPLE on load (so it reads as a finished instrument and
 * explains itself), then swaps to the visitor's real analysis. The deep run
 * (Perplexity research + full value chain + PDF) lives on /discover.
 *
 * Headline/input/strip render during SSR (LCP-safe); the analysis is
 * progressive enhancement. Honest single "Analyzing…" state over real latency.
 */

type Analysis = {
  company: string;
  industry: string;
  readinessBand: string;
  teaser: string[];
  domain: string;
};
type Status = 'idle' | 'loading' | 'done' | 'error';

export function Hero() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Analysis | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || status === 'loading') return;
    setStatus('loading');
    setResult(null);
    setErrorMsg('');
    try {
      const res = await fetch('/api/hero-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (res.status === 400 && data.invalid) {
        setStatus('error');
        setErrorMsg('Enter a valid company website, e.g. acme.com');
        return;
      }
      if (!res.ok || data.fallback || !data.readinessBand) {
        setStatus('error');
        setErrorMsg('');
        return;
      }
      setResult(data as Analysis);
      setStatus('done');
    } catch {
      setStatus('error');
      setErrorMsg('');
    }
  }

  const domainLabel =
    url
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '') || 'your site';

  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(2.5rem,5vw,5rem)]">
          {/* Left — value prop + live analyzer */}
          <div>
            <p className="overline">{hero.eyebrow}</p>
            <h1
              className="mt-5 text-anthracite"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 6.2vw, 5.25rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                fontWeight: 600,
              }}
            >
              {hero.headline[0]}
              <br />
              ROI you can <span className="text-brass">prove.</span>
            </h1>
            <p className="mt-5 max-w-xl text-body-lg text-warm-gray">{hero.sub}</p>

            {/* Live analyzer — the primary action */}
            <form onSubmit={analyze} className="mt-8 max-w-lg">
              <div className="flex items-center gap-2 overline mb-2.5">
                <span className="inline-block h-1.5 w-1.5 bg-brass" aria-hidden="true" />
                {hero.analyzerLabel}
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="flex flex-1 items-center border border-divider bg-warm-white transition-colors focus-within:border-brass">
                  <span className="select-none pl-3.5 text-body-sm text-stone">https://</span>
                  <input
                    id="hero-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    aria-label="Your company website"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourcompany.com"
                    className="w-full bg-transparent py-3 pl-1 pr-3.5 text-anthracite placeholder:text-stone focus:outline-none"
                  />
                </div>
                <Button type="submit" size="lg" disabled={status === 'loading' || !url.trim()}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                    </>
                  ) : (
                    <>
                      {hero.analyzeCta} <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-2.5 text-xs text-stone">
                {hero.analyzerHelper} Or{' '}
                <Link href={hero.secondaryCta.href} className="link-underline text-warm-gray">
                  see engagements &amp; pricing
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Right — live result card (sample → real) */}
          <HeroResultCard
            status={status}
            result={result}
            domainLabel={domainLabel}
            errorMsg={errorMsg}
          />
        </div>

        {/* Stat strip */}
        <dl className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-2 lg:grid-cols-4">
          {hero.stats.map((s) => (
            <div
              key={s.label}
              className="border-t border-divider py-5 pr-6 [&:not(:first-child)]:lg:border-l [&:not(:first-child)]:lg:border-divider [&:not(:first-child)]:lg:pl-6"
            >
              <dt className="metric text-2xl text-anthracite sm:text-[1.75rem]">{s.value}</dt>
              <dd className="mt-2 text-body-sm text-warm-gray">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HeroResultCard({
  status,
  result,
  domainLabel,
  errorMsg,
}: {
  status: Status;
  result: Analysis | null;
  domainLabel: string;
  errorMsg: string;
}) {
  // idle renders the labeled sample so the card always looks finished
  const isSample = status === 'idle';
  const band = status === 'done' && result ? result.readinessBand : heroSample.band;
  const sub =
    status === 'done' && result
      ? `${result.company}${result.industry ? ` · ${result.industry}` : ''}`
      : heroSample.industry;
  const plays = status === 'done' && result ? result.teaser : heroSample.plays;
  const showResult = status === 'idle' || status === 'done';

  return (
    <aside
      className="dark-section relative border border-divider-dark p-6 sm:p-8"
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="metric text-[11px] uppercase tracking-[0.16em] text-stone">
          AI production-readiness
        </span>
        {isSample ? (
          <span className="metric text-[10px] uppercase tracking-[0.16em] text-brass-light border border-brass-light/40 px-1.5 py-0.5">
            Sample
          </span>
        ) : status === 'done' && result ? (
          <span className="metric text-[11px] uppercase tracking-[0.16em] text-stone">
            {result.domain}
          </span>
        ) : null}
      </div>

      {/* RESULT (sample or real) */}
      {showResult && (
        <div className={isSample ? 'opacity-90' : ''}>
          <div className="mt-6">
            <span
              className="metric text-bone"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1 }}
            >
              {band}
            </span>
            <p className="mt-2 text-body-sm text-stone">
              Estimated AI-readiness ·{' '}
              <span className={isSample ? 'text-stone' : 'text-bone'}>{sub}</span>
            </p>
          </div>

          <div className="mt-6 border-t border-divider-dark pt-5">
            <p className="metric text-[11px] uppercase tracking-[0.16em] text-brass-light">
              Where we&apos;d start
            </p>
            <div className="mt-3 space-y-2.5">
              {plays.map((t, i) => (
                <div key={t} className="flex gap-3">
                  <span className="metric text-xs text-brass-light">0{i + 1}</span>
                  <span className="text-body-sm text-bone">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer: idle = prompt back to the input; done = CTA into /discover */}
          {isSample ? (
            <div className="mt-6 flex items-center gap-2 border-t border-divider-dark pt-5 text-body-sm text-stone">
              <ArrowRight className="h-4 w-4 shrink-0 text-brass-light" aria-hidden="true" />
              Enter your URL to generate your live score.
            </div>
          ) : (
            <div className="mt-6 border-t border-divider-dark pt-5">
              <Button size="default" className="w-full" asChild>
                <Link href="/discover">
                  Get your full value chain &amp; report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-2.5 text-center text-xs text-stone">
                Full readiness score, custom value chain &amp; PDF — free.
              </p>
            </div>
          )}
        </div>
      )}

      {/* LOADING — honest single state over real latency */}
      {status === 'loading' && (
        <div className="py-14 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-brass-light" />
          <p className="mt-5 text-body text-bone">Analyzing {domainLabel}…</p>
          <p className="mt-1.5 text-body-sm text-stone">
            Reading your homepage · mapping your value chain
          </p>
        </div>
      )}

      {/* ERROR — graceful fallback to the full tool */}
      {status === 'error' && (
        <div className="py-14 text-center">
          <p className="text-body text-bone">
            {errorMsg || `We couldn't analyze ${domainLabel} just now.`}
          </p>
          <p className="mt-2 text-body-sm text-stone">
            Run the full analysis instead — it reads deeper.
          </p>
          <Button size="default" variant="outline-light" className="mt-6" asChild>
            <Link href="/discover">
              Open Forge Intelligence <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </aside>
  );
}
