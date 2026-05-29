'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { hero } from '@/data/homepage';

/**
 * V9 Hero — live AI-readiness analyzer. Visitor enters their URL; we fetch
 * their homepage and return a REAL readiness band + 3 value-chain opportunities
 * (one fast Claude call via /api/hero-analyze). The proof card on the right is
 * the live result surface — it starts as an empty instrument and fills with the
 * visitor's own analysis. The deep run (Perplexity research + full value chain
 * + report) lives on /discover, reached via the result CTA.
 *
 * Headline/input/strip render during SSR (LCP-safe); only the analysis is
 * progressive enhancement. Honest single "Analyzing…" state over real latency —
 * no fake progress theater.
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(2rem,5vw,4.75rem)]">
          {/* Left — headline + live analyzer input */}
          <div>
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

            {/* Live analyzer input */}
            <form onSubmit={analyze} className="mt-9 max-w-lg">
              <label htmlFor="hero-url" className="overline mb-2 block">
                Score your business in seconds
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center border border-divider bg-warm-white focus-within:border-brass">
                  <span className="pl-3.5 text-body-sm text-stone select-none">https://</span>
                  <input
                    id="hero-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
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
                      Analyze <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-2.5 text-xs text-stone">
                Free · instant · no signup. Or{' '}
                <Link href={hero.secondaryCta.href} className="link-underline text-warm-gray">
                  {hero.secondaryCta.label.toLowerCase()}
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Right — live result card */}
          <HeroResultCard
            status={status}
            result={result}
            domainLabel={domainLabel}
            errorMsg={errorMsg}
          />
        </div>

        {/* Stat strip */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-2 border-t border-divider lg:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-0 py-6 sm:px-6 ${i % 2 === 1 ? 'border-l border-divider pl-6 sm:pl-6 lg:border-l' : 'pr-6'} ${
                i > 0 ? 'lg:border-l lg:border-divider' : ''
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
  return (
    <aside
      className="dark-section border border-divider-dark p-6 sm:p-8"
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-stone metric">
        <span>AI production-readiness</span>
        <span>{status === 'done' && result ? result.domain : 'scorecard'}</span>
      </div>

      {/* IDLE — empty instrument */}
      {status === 'idle' && (
        <>
          <div className="mt-5 flex items-baseline gap-3">
            <span
              className="metric text-stone/40"
              style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', lineHeight: 1 }}
            >
              —
            </span>
            <span className="metric text-lg text-stone/40">/ 100</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-divider-dark" />
          <div className="mt-7 space-y-4">
            {['Data readiness', 'Deployment path', 'Adoption plan'].map((k) => (
              <div key={k} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-body-sm text-stone/60">{k}</span>
                <span className="h-1 flex-1 bg-divider-dark" />
                <span className="metric w-10 shrink-0 text-right text-body-sm text-stone/40">
                  —
                </span>
              </div>
            ))}
          </div>
          <div className="mt-7 border-t border-divider-dark pt-4 text-xs text-stone">
            Enter your URL — our AI reads your site and scores you live.
          </div>
        </>
      )}

      {/* LOADING — honest single state over real latency */}
      {status === 'loading' && (
        <div className="py-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-brass-light" />
          <p className="mt-5 text-body text-bone">Analyzing {domainLabel}…</p>
          <p className="mt-1.5 text-body-sm text-stone">
            Reading your homepage · mapping your value chain
          </p>
        </div>
      )}

      {/* DONE — real analysis */}
      {status === 'done' && result && (
        <>
          <div className="mt-5">
            <div className="flex items-baseline gap-3">
              <span
                className="metric text-bone"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1 }}
              >
                {result.readinessBand}
              </span>
            </div>
            <p className="mt-1.5 text-body-sm text-stone">
              Estimated AI-readiness for <span className="text-bone">{result.company}</span>
              {result.industry ? ` · ${result.industry}` : ''}
            </p>
          </div>
          <div className="mt-6 space-y-3 border-t border-divider-dark pt-5">
            <p className="metric text-[11px] uppercase tracking-[0.16em] text-brass-light">
              Where we'd start
            </p>
            {result.teaser.map((t, i) => (
              <div key={t} className="flex gap-3">
                <span className="metric text-xs text-brass-light">0{i + 1}</span>
                <span className="text-body-sm text-bone">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 border-t border-divider-dark pt-5">
            <Button size="default" className="w-full" asChild>
              <Link href="/discover">
                Get your full value chain &amp; report <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-2.5 text-center text-xs text-stone">
              Full readiness score, custom value chain &amp; PDF — free.
            </p>
          </div>
        </>
      )}

      {/* ERROR — graceful fallback to the full tool */}
      {status === 'error' && (
        <div className="py-10 text-center">
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
