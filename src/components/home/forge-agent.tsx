'use client';

import { ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Forge Intelligence — the live agent embedded in the hero. Visitor enters
 * their URL; /api/hero-analyze fetches their homepage + one Claude call and
 * returns a real readiness band + a flagship diagnostic thesis. The card
 * transforms in place (prompt → analyzing → result). Styled for the dark
 * hero; accents inherit the site palette via tokens.
 *
 * The deep run (Perplexity research + full value chain + PDF) lives on
 * /discover, reached from the result. Honest staged loading over real
 * latency — no fake progress theater.
 */

const AGENT = {
  name: 'Forge Intelligence',
  heading: 'Score your AI readiness in 60 seconds.',
  prompt: 'Enter your website — the agent reads it and shows where AI pays off first.',
  cta: 'Analyze',
  note: 'Free · instant · no signup',
  gets: "You'll get a 0–100 readiness band and your top 3 AI opportunities.",
};

const LOADING_STAGES = [
  'Reading your homepage…',
  'Mapping your value chain…',
  'Drafting your priority thesis…',
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
    <aside
      className="w-full border border-bone/15 bg-black/30 backdrop-blur-sm"
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      {/* Agent status bar */}
      <div className="flex items-center justify-between border-b border-bone/12 px-5 py-3 sm:px-6">
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-brass-light ${status === 'loading' ? 'animate-pulse' : ''}`}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-bone">{AGENT.name}</span>
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

      <div className="p-5 sm:p-6">
        {/* IDLE */}
        {status === 'idle' && (
          <form onSubmit={analyze}>
            <h2 className="text-h4 text-bone sm:text-h3">{AGENT.heading}</h2>
            <p className="mt-2 text-body-sm text-stone">{AGENT.prompt}</p>

            <div className="mt-5 flex items-center border border-bone/15 bg-black/30 transition-colors focus-within:border-brass-light">
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
              {AGENT.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-center text-xs text-stone">{AGENT.gets}</p>
            <p className="mt-1 text-center text-xs text-stone/70">{AGENT.note}</p>
          </form>
        )}

        {/* LOADING — honest staged labels over real latency */}
        {status === 'loading' && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-brass-light" />
            <p className="mt-5 text-body text-bone">Analyzing {domainLabel}…</p>
            <p className="mt-1.5 text-body-sm text-brass-light">{LOADING_STAGES[stage]}</p>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {LOADING_STAGES.map((label, i) => (
                <span
                  key={label}
                  className={`h-1 w-6 transition-colors ${i <= stage ? 'bg-brass-light' : 'bg-bone/15'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        )}

        {/* DONE — live diagnostic thesis */}
        {status === 'done' && result && (
          <div>
            <span
              className="metric text-bone"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', lineHeight: 1 }}
            >
              {result.readinessBand}
            </span>
            <p className="mt-2 text-body-sm text-stone">
              Estimated AI-readiness · <span className="text-bone">{result.company}</span>
              {result.industry ? ` · ${result.industry}` : ''}
            </p>

            <div className="mt-6 border-t border-bone/12 pt-5">
              <p className="metric text-[11px] uppercase tracking-[0.16em] text-brass-light">
                Priority play
              </p>
              <h3 className="mt-2 text-h4 text-bone">{result.priority.title}</h3>
              <dl className="mt-4 space-y-3">
                {[
                  { k: 'The gap', v: result.priority.painpoint },
                  { k: "What we'd build", v: result.priority.intervention },
                  { k: 'The ambition', v: result.priority.futureState },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="metric text-[10px] uppercase tracking-[0.14em] text-stone">
                      {row.k}
                    </dt>
                    <dd className="mt-0.5 text-body-sm text-bone">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 border-l-2 border-brass-light pl-3.5">
                <p className="text-body-sm font-semibold text-brass-light">{result.priority.benefit}</p>
                <p className="mt-1 text-xs text-stone">{result.priority.evidence}</p>
              </div>
            </div>

            {result.more.length > 0 && (
              <div className="mt-6 border-t border-bone/12 pt-5">
                <p className="metric text-[11px] uppercase tracking-[0.16em] text-stone">
                  Also on the table
                </p>
                <div className="mt-3 space-y-2">
                  {result.more.map((m) => (
                    <div key={m} className="flex gap-2.5">
                      <span
                        className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-stone"
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-stone">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-bone/12 pt-5">
              <Button size="default" className="w-full" asChild>
                <Link href="/discover" data-analytics="home_hero_agent_full_report">
                  Get the full thesis &amp; cited report <ArrowRight className="ml-2 h-4 w-4" />
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
            <p className="mt-2 text-body-sm text-stone">Run the full analysis instead — it reads deeper.</p>
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
