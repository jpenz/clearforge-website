'use client';

import { ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { heroAgent } from '@/data/homepage';

/**
 * Forge Intelligence™ — the live agent, framed as product UI in browser
 * chrome (V11 "product as hero object"). Visitor enters their URL; the card
 * transforms in place: prompt → honest staged analyzing → diagnostic thesis.
 * Backend: /api/hero-analyze (SSRF-safe, rate-limited). Deep run lives on
 * /discover.
 */

const LOADING_STAGES = [
  'Reading your homepage…',
  'Mapping your value chain…',
  'Drafting your priority play…',
];

type Priority = {
  title: string;
  painpoint: string;
  intervention: string;
  futureState: string;
  benefit: string;
  evidence: string;
};
type Analysis = {
  company: string;
  industry: string;
  readinessBand: string;
  priority: Priority;
  more: string[];
  domain: string;
};
type Status = 'idle' | 'loading' | 'done' | 'error';

export function ForgeAgent() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Analysis | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (status !== 'loading') {
      setStage(0);
      return;
    }
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, LOADING_STAGES.length - 1));
    }, 3200);
    return () => clearInterval(id);
  }, [status]);

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
    <div className="browser-chrome w-full" aria-live="polite" aria-busy={status === 'loading'}>
      {/* Chrome bar */}
      <div className="browser-chrome__bar">
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__dot" />
        <span className="browser-chrome__url">{heroAgent.url}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-[var(--color-ember-vivid)] ${status === 'loading' ? 'animate-pulse' : ''}`}
            aria-hidden="true"
          />
          <span className="metric text-[10px] uppercase tracking-[0.14em] text-warm-gray">
            {status === 'loading' ? 'Running' : status === 'done' ? 'Complete' : 'Live'}
          </span>
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Agent identity row */}
        <div className="flex items-center justify-between gap-3">
          <span className="metric text-[11px] uppercase tracking-[0.14em] text-brass">
            {heroAgent.name}
          </span>
          {status === 'done' && result && (
            <span className="metric text-[11px] text-warm-gray">{result.domain}</span>
          )}
        </div>

        {/* IDLE */}
        {status === 'idle' && (
          <form onSubmit={analyze} className="mt-4">
            <p className="text-h4 text-anthracite">{heroAgent.heading}</p>
            <p className="mt-1.5 text-body-sm text-warm-gray">{heroAgent.prompt}</p>
            <div className="mt-4 flex items-center rounded-[6px] border border-divider bg-parchment transition-colors focus-within:border-brass">
              <span className="metric select-none pl-3 text-xs text-warm-gray">https://</span>
              <input
                id="hero-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                aria-label="Your company website"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourcompany.com"
                className="w-full bg-transparent py-2.5 pl-1 pr-3 text-anthracite placeholder:text-warm-gray/60 focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="mt-3 w-full" disabled={!url.trim()}>
              {heroAgent.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="metric mt-3 text-center text-[11px] text-warm-gray">{heroAgent.note}</p>
          </form>
        )}

        {/* LOADING — honest staged labels over real latency */}
        {status === 'loading' && (
          <div className="py-10 text-center">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-brass" />
            <p className="mt-4 text-body text-anthracite">Analyzing {domainLabel}…</p>
            <p className="metric mt-1.5 text-xs text-brass">{LOADING_STAGES[stage]}</p>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {LOADING_STAGES.map((label, i) => (
                <span
                  key={label}
                  className={`h-1 w-6 rounded-full transition-colors ${i <= stage ? 'bg-brass' : 'bg-divider'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        )}

        {/* DONE — diagnostic thesis */}
        {status === 'done' && result && (
          <div className="mt-3">
            <span className="metric text-3xl text-anthracite sm:text-4xl">
              {result.readinessBand}
            </span>
            <p className="mt-1.5 text-body-sm text-warm-gray">
              Estimated AI-readiness · <span className="text-anthracite">{result.company}</span>
              {result.industry ? ` · ${result.industry}` : ''}
            </p>

            <div className="mt-4 border-t border-divider pt-4">
              <p className="metric text-[11px] uppercase tracking-[0.14em] text-brass">
                Priority play
              </p>
              <p className="mt-1.5 text-h4 text-anthracite">{result.priority.title}</p>
              <dl className="mt-3 space-y-2.5">
                {[
                  { k: 'The gap', v: result.priority.painpoint },
                  { k: "What we'd build", v: result.priority.intervention },
                  { k: 'The ambition', v: result.priority.futureState },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                      {row.k}
                    </dt>
                    <dd className="mt-0.5 text-body-sm text-anthracite">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3.5 border-l-2 border-brass pl-3">
                <p className="text-body-sm font-semibold text-brass">{result.priority.benefit}</p>
                <p className="mt-1 text-xs text-warm-gray">{result.priority.evidence}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-divider pt-4">
              <Button size="default" className="w-full" asChild>
                <Link href="/discover" data-analytics="home_hero_agent_full_report">
                  Get the full thesis &amp; cited report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={reset}
                className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 text-xs text-warm-gray transition-colors hover:text-anthracite"
              >
                <RotateCcw className="h-3 w-3" /> Analyze another site
              </button>
            </div>
          </div>
        )}

        {/* ERROR — graceful fallback */}
        {status === 'error' && (
          <div className="py-9 text-center">
            <p className="text-body text-anthracite">
              {errorMsg || `We couldn't analyze ${domainLabel} just now.`}
            </p>
            <p className="mt-1.5 text-body-sm text-warm-gray">
              Run the full analysis instead — it reads deeper.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button size="default" variant="secondary" asChild>
                <Link href="/discover">
                  Open Forge Intelligence <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-warm-gray transition-colors hover:text-anthracite"
              >
                <RotateCcw className="h-3 w-3" /> Try another site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
