'use client';

import { ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { heroAgent } from '@/data/homepage';

/**
 * Forge Intelligence™ — the live agent, framed as product UI in browser
 * chrome. Visitor enters their URL; the card transforms in place. The API
 * streams NDJSON: real progress events ({t:'p'}), partial field snapshots
 * as the model writes ({t:'f'}), then the validated result ({t:'d'}).
 * No fake timers anywhere — every line shown is work actually happening.
 */

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
type PartialFields = Record<string, string>;
type Status = 'idle' | 'loading' | 'done' | 'error';

function Pending({ width = 'w-3/4' }: { width?: string }) {
  return <span className={`inline-block h-3.5 ${width} animate-pulse rounded bg-divider`} />;
}

export function ForgeAgent() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Analysis | null>(null);
  const [partial, setPartial] = useState<PartialFields>({});
  const [progress, setProgress] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const runId = useRef(0);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || status === 'loading') return;
    const run = ++runId.current;
    setStatus('loading');
    setResult(null);
    setPartial({});
    setProgress([]);
    setErrorMsg('');
    try {
      const res = await fetch('/api/hero-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const contentType = res.headers.get('content-type') ?? '';
      if (!res.ok || !contentType.includes('ndjson') || !res.body) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 400 && data.invalid) {
          setStatus('error');
          setErrorMsg('Enter a valid company website, e.g. acme.com');
          return;
        }
        setStatus('error');
        setErrorMsg('');
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let tail = '';
      let finished = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        tail += decoder.decode(value, { stream: true });
        const lines = tail.split('\n');
        tail = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim() || runId.current !== run) continue;
          let evt: { t: string; label?: string; data?: unknown };
          try {
            evt = JSON.parse(line);
          } catch {
            continue;
          }
          if (evt.t === 'p' && evt.label) {
            setProgress((prev) => [...prev, evt.label as string]);
          } else if (evt.t === 'f' && evt.data) {
            setPartial(evt.data as PartialFields);
          } else if (evt.t === 'd' && evt.data) {
            setResult(evt.data as Analysis);
            setStatus('done');
            finished = true;
          } else if (evt.t === 'e') {
            setStatus('error');
            setErrorMsg('');
            finished = true;
          }
        }
      }
      if (!finished && runId.current === run) {
        setStatus('error');
        setErrorMsg('');
      }
    } catch {
      if (runId.current === run) {
        setStatus('error');
        setErrorMsg('');
      }
    }
  }

  function reset() {
    runId.current++;
    setStatus('idle');
    setResult(null);
    setPartial({});
    setProgress([]);
    setErrorMsg('');
  }

  const domainLabel =
    url
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '') || 'your site';

  const streaming = status === 'loading' && Object.keys(partial).length > 0;
  const band = result?.readinessBand ?? partial.readinessBand;
  const company = result?.company ?? partial.company;
  const industry = result?.industry ?? partial.industry;
  const thesis: Array<{ k: string; v?: string }> = [
    { k: 'The gap', v: result?.priority.painpoint ?? partial.painpoint },
    { k: "What we'd build", v: result?.priority.intervention ?? partial.intervention },
    { k: 'The ambition', v: result?.priority.futureState ?? partial.futureState },
  ];
  const benefit = result?.priority.benefit ?? partial.benefit;
  const evidence = result?.priority.evidence ?? partial.evidence;
  const title = result?.priority.title ?? partial.title;

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
            className={`h-1.5 w-1.5 rounded-full bg-brass ${status === 'loading' ? 'animate-pulse' : ''}`}
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
          {(status === 'done' || streaming) && (
            <span className="metric text-[11px] text-warm-gray">
              {result?.domain ?? domainLabel}
            </span>
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

        {/* WORKING — real progress stream, no fake timers */}
        {status === 'loading' && !streaming && (
          <div className="py-8">
            <div className="flex items-center gap-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-brass" />
              <p className="text-body-sm text-anthracite">Analyzing {domainLabel}</p>
            </div>
            <div className="mt-4 space-y-1.5 border-l border-divider pl-3.5">
              {progress.slice(-4).map((label, i, arr) => (
                <p
                  key={label}
                  className={`metric text-[11px] leading-relaxed ${
                    i === arr.length - 1 ? 'text-brass' : 'text-warm-gray'
                  }`}
                >
                  {label}
                </p>
              ))}
              {progress.length === 0 && (
                <p className="metric text-[11px] text-warm-gray">Connecting…</p>
              )}
            </div>
          </div>
        )}

        {/* STREAMING + DONE — the thesis, filling in as it's written */}
        {(streaming || (status === 'done' && result)) && (
          <div className="mt-3">
            {band ? (
              <span className="metric text-3xl text-anthracite sm:text-4xl">{band}</span>
            ) : (
              <Pending width="w-32" />
            )}
            <p className="mt-1.5 text-body-sm text-warm-gray">
              Estimated AI-readiness
              {company ? (
                <>
                  {' · '}
                  <span className="text-anthracite">{company}</span>
                </>
              ) : null}
              {industry ? ` · ${industry}` : ''}
            </p>

            <div className="mt-4 border-t border-divider pt-4">
              <p className="metric text-[11px] uppercase tracking-[0.14em] text-brass">
                Priority play
              </p>
              <p className="mt-1.5 text-h4 text-anthracite">{title ?? <Pending width="w-2/3" />}</p>
              <dl className="mt-3 space-y-2.5">
                {thesis.map((row) => (
                  <div key={row.k}>
                    <dt className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                      {row.k}
                    </dt>
                    <dd className="mt-0.5 text-body-sm text-anthracite">{row.v ?? <Pending />}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3.5 border-l-2 border-brass pl-3">
                <p className="text-body-sm font-semibold text-brass">
                  {benefit ?? <Pending width="w-1/2" />}
                </p>
                {evidence && <p className="mt-1 text-xs text-warm-gray">{evidence}</p>}
              </div>
            </div>

            {status === 'done' && (
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
            )}
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
