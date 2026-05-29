'use client';

import { ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { hero, heroAgent } from '@/data/homepage';

/**
 * V9 Hero — the card IS the agent. A working Forge Intelligence agent embedded
 * in the hero: the visitor enters their website inside the card and it
 * transforms in place (prompt → analyzing → live result) via /api/hero-analyze
 * (one fast Claude call on their real homepage). The deep run (Perplexity
 * research + full value chain + PDF) lives on /discover, reached from the result.
 *
 * Left column (value prop) + headline render during SSR (LCP-safe); the agent
 * is a progressive-enhancement client island. Honest single "Analyzing…" state
 * over real latency — no fake progress theater.
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
  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[clamp(2.5rem,5vw,5rem)]">
          {/* Left — value prop */}
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
            <p className="mt-6 max-w-xl text-body-lg text-warm-gray">{hero.sub}</p>
            <Link
              href={hero.secondaryCta.href}
              className="link-underline mt-7 inline-flex items-center gap-2 text-sm font-medium text-warm-gray transition-colors hover:text-brass"
            >
              {hero.secondaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right — the embedded agent */}
          <ForgeAgent />
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

function ForgeAgent() {
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

  function reset() {
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }

  const domainLabel =
    url
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '') || 'your site';

  return (
    <aside
      className="dark-section border border-divider-dark"
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      {/* Agent status bar */}
      <div className="flex items-center justify-between border-b border-divider-dark px-6 py-3.5 sm:px-7">
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${status === 'loading' ? 'bg-brass-light animate-pulse' : 'bg-brass-light'}`}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-bone">{heroAgent.name}</span>
        </span>
        <span className="metric text-[10px] uppercase tracking-[0.16em] text-stone">
          {status === 'loading'
            ? 'Analyzing'
            : status === 'done' && result
              ? result.domain
              : status === 'error'
                ? 'Retry'
                : 'Live'}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        {/* IDLE — the agent prompt + input */}
        {status === 'idle' && (
          <form onSubmit={analyze}>
            <h2 className="text-h3 text-bone">{heroAgent.heading}</h2>
            <p className="mt-2 text-body-sm text-stone">{heroAgent.prompt}</p>

            <div className="mt-5 flex items-center border border-divider-dark bg-black/20 transition-colors focus-within:border-brass-light">
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
                className="w-full bg-transparent py-3 pl-1 pr-3.5 text-bone placeholder:text-stone focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="mt-3 w-full" disabled={!url.trim()}>
              {heroAgent.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-center text-xs text-stone">{heroAgent.gets}</p>
            <p className="mt-1 text-center text-xs text-stone/70">{heroAgent.note}</p>
          </form>
        )}

        {/* LOADING — honest single state over real latency */}
        {status === 'loading' && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-brass-light" />
            <p className="mt-5 text-body text-bone">Analyzing {domainLabel}…</p>
            <p className="mt-1.5 text-body-sm text-stone">
              Reading your homepage · mapping your value chain
            </p>
          </div>
        )}

        {/* DONE — live result */}
        {status === 'done' && result && (
          <div>
            <span
              className="metric text-bone"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1 }}
            >
              {result.readinessBand}
            </span>
            <p className="mt-2 text-body-sm text-stone">
              Estimated AI-readiness · <span className="text-bone">{result.company}</span>
              {result.industry ? ` · ${result.industry}` : ''}
            </p>

            <div className="mt-6 border-t border-divider-dark pt-5">
              <p className="metric text-[11px] uppercase tracking-[0.16em] text-brass-light">
                Where we&apos;d start
              </p>
              <div className="mt-3 space-y-2.5">
                {result.teaser.map((t, i) => (
                  <div key={t} className="flex gap-3">
                    <span className="metric text-xs text-brass-light">0{i + 1}</span>
                    <span className="text-body-sm text-bone">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-divider-dark pt-5">
              <Button size="default" className="w-full" asChild>
                <Link href="/discover">
                  Get your full value chain &amp; report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={reset}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs text-stone transition-colors hover:text-bone"
              >
                <RotateCcw className="h-3 w-3" /> Analyze another site
              </button>
            </div>
          </div>
        )}

        {/* ERROR — graceful fallback */}
        {status === 'error' && (
          <div className="py-10 text-center">
            <p className="text-body text-bone">
              {errorMsg || `We couldn't analyze ${domainLabel} just now.`}
            </p>
            <p className="mt-2 text-body-sm text-stone">
              Run the full analysis instead — it reads deeper.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Button size="default" variant="outline-light" asChild>
                <Link href="/discover">
                  Open Forge Intelligence <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-stone transition-colors hover:text-bone"
              >
                <RotateCcw className="h-3 w-3" /> Try another site
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
