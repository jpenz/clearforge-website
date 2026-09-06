'use client';

import { useRef, useState } from 'react';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { type AnalysisStatus, useAnalysisStream } from '@/hooks/useAnalysisStream';

const FIELD_ROWS: Array<{
  key: string;
  label: string;
  illustrative: boolean;
  numeric: boolean;
}> = [
  { key: 'workflow', label: 'Workflow', illustrative: true, numeric: false },
  {
    key: 'manualSteps',
    label: 'Manual steps found',
    illustrative: true,
    numeric: true,
  },
  {
    key: 'candidate',
    label: 'Candidate AI system',
    illustrative: true,
    numeric: false,
  },
  {
    key: 'window',
    label: 'Estimated build window',
    illustrative: false,
    numeric: true,
  },
];

/** The sample chips. `example` is how the readout names the run afterwards. */
const SAMPLES: Array<{ chip: string; example: string }> = [
  { chip: 'industrial distributor', example: 'an industrial distributor' },
  { chip: 'services firm', example: 'a services firm' },
  { chip: 'PE portfolio co', example: 'a PE portfolio company' },
];

/** The idle-state sample readout: one worked example, labelled as such. */
const SAMPLE_READOUT: Array<{
  label: string;
  value: string;
  numeric?: boolean;
}> = [
  { label: 'Workflow', value: 'Inbound quote to order' },
  { label: 'Manual steps found', value: '14', numeric: true },
  { label: 'Candidate AI system', value: 'Quote desk agent' },
  { label: 'Estimated build window', value: '10 to 14 weeks', numeric: true },
];

const HOST_PATTERN = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const secondaryButton =
  'cursor-pointer text-[14px] font-semibold text-cobalt transition-colors hover:text-cobalt-press';

/**
 * The free tool in the hero: one name (Map the Workflow), the purpose
 * stated before the field, a URL that must look like a host before it
 * runs, and a way back from every state (cancel while running, try
 * another company when done or failed).
 *
 * The status line reports the MODE, not just the state. The stream falls
 * back to a simulated profile whenever the model call fails, in production
 * too, so "Complete" and "Analysis complete" are reserved for a live read
 * of a typed site; a fallback says the site could not be read and a sample
 * chip says it is an example, both before the reader reaches the rows.
 */
export function HeroAgent() {
  const { status, target, progress, fields, live, run, reset } = useAnalysisStream('brief');
  const [input, setInput] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const [sample, setSample] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /** A sample chip is an example by definition; a typed run is an example
   *  whenever the stream never reported live mode. */
  const illustrative = sample !== null || !live;

  const statusWord = (state: Exclude<AnalysisStatus, 'idle'>) => {
    if (state === 'running') return sample ? 'Building an example' : 'Reading site';
    if (state === 'streaming') return illustrative ? 'Writing example' : 'Writing readout';
    if (state === 'done') return illustrative ? 'Example' : 'Complete';
    return 'Did not complete';
  };

  const readoutHeader = () => {
    if (sample) return `Example: ${sample} · illustrative`;
    if (!illustrative) return status === 'done' ? 'Analysis complete' : 'Analysis streaming';
    if (status === 'done') return `Could not read ${target}. Here is an illustrative readout.`;
    return 'Illustrative readout';
  };

  const submit = () => {
    const value = input.trim();
    if (!HOST_PATTERN.test(value)) {
      setHint('Enter a company website, like acme.com');
      inputRef.current?.focus();
      return;
    }
    setHint(null);
    setSample(null);
    void run(value);
  };

  const startOver = () => {
    setInput('');
    setHint(null);
    setSample(null);
    reset();
  };

  return (
    <div className="border border-ink bg-white text-ink">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <span className="text-[12px] font-semibold tracking-[0.14em] uppercase">
          Free tool · Map the Workflow
        </span>
        <span
          className={`tnum text-[12px] tracking-[0.14em] uppercase ${
            status === 'error' ? 'text-ink' : 'text-cobalt'
          }`}
          aria-live="polite"
        >
          {status === 'idle' ? '' : statusWord(status)}
        </span>
      </div>

      <div className="relative min-h-[318px]" aria-live="polite">
        {status === 'idle' && (
          <form
            className="px-5 py-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <p className="mb-5 max-w-[46ch] text-[14px] leading-relaxed text-ink/70">
              Maps one revenue workflow, finds the manual steps, and names a candidate AI system.
              Free. Runs in under a minute.
            </p>
            <label
              className="mb-2 block text-[12px] tracking-[0.14em] text-ink/70 uppercase"
              htmlFor="hero-agent-url"
            >
              Company URL
            </label>
            <div className="flex border border-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cobalt">
              <input
                ref={inputRef}
                id="hero-agent-url"
                type="text"
                inputMode="url"
                required
                aria-describedby={hint ? 'hero-agent-hint' : undefined}
                aria-invalid={hint ? true : undefined}
                autoComplete="url"
                placeholder="yourcompany.com"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  if (hint) setHint(null);
                }}
                className="min-w-0 grow bg-white px-3 py-2.5 text-[14px] outline-hidden placeholder:text-ink/40"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer bg-ink px-4 text-[14px] font-semibold text-ghost transition-colors hover:bg-ink/85"
              >
                Map the Workflow
              </button>
            </div>
            <p id="hero-agent-hint" role="status" className="empty:hidden">
              {hint && (
                <span className="mt-2 block text-[14px] font-medium text-cobalt-press">{hint}</span>
              )}
            </p>
            <p className="mt-6 mb-2 text-[12px] tracking-[0.14em] text-ink/70 uppercase">
              Or try a sample
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLES.map((item) => (
                <button
                  key={item.chip}
                  type="button"
                  onClick={() => {
                    setSample(item.example);
                    void run(item.chip);
                  }}
                  className="cursor-pointer border border-hairline-strong px-3 py-1.5 text-[12px] transition-colors hover:border-ink"
                >
                  {item.chip}
                </button>
              ))}
            </div>
            <div className="mt-7">
              <div className="mb-2 flex items-baseline justify-between gap-4 text-[12px] text-ink/70">
                <span>Example: an industrial distributor</span>
                <span className="tracking-[0.14em] uppercase">Illustrative</span>
              </div>
              <dl className="border-t border-hairline text-[14px]">
                {SAMPLE_READOUT.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-2"
                  >
                    <dt className="shrink-0 text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                      {row.label}
                    </dt>
                    <dd className={`text-right font-medium ${row.numeric ? 'tnum' : ''}`}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </form>
        )}

        {status === 'running' && (
          <div className="px-5 py-6">
            <div className="relative mb-6 h-px bg-hairline">
              <div className="cf-progress-bar absolute top-0 left-0 h-[2px] bg-cobalt" />
            </div>
            <p className="tnum mb-4 text-[12px] tracking-[0.14em] text-ink/70 uppercase">
              {sample ? `Building an example: ${sample}` : `Reading ${target}`}
            </p>
            <ul className="space-y-3 text-[14px]">
              {progress.map((step) => (
                <li key={step} className="flex items-center gap-3">
                  <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
                  {step}
                </li>
              ))}
            </ul>
            <button type="button" onClick={startOver} className={`mt-6 ${secondaryButton}`}>
              Cancel
            </button>
          </div>
        )}

        {(status === 'streaming' || status === 'done') && (
          <div className="px-5 py-6">
            <p className="mb-4 max-w-[46ch] text-[12px] tracking-[0.14em] text-ink/70 uppercase">
              {readoutHeader()}
            </p>
            <dl className="text-[14px]">
              {FIELD_ROWS.map((row, index) => {
                const value = fields[row.key];
                if (!value) return null;
                return (
                  <div
                    key={row.key}
                    className={`flex items-baseline justify-between gap-4 py-2.5 ${
                      index < FIELD_ROWS.length - 1 || status === 'done'
                        ? 'border-b border-hairline'
                        : ''
                    }`}
                  >
                    <dt className="shrink-0 text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                      {row.label}
                    </dt>
                    <dd className={`text-right font-medium ${row.numeric ? 'tnum' : ''}`}>
                      {value}
                      {row.illustrative && illustrative && (
                        <span className="ml-1 text-[12px] font-normal tracking-[0.1em] text-ink/70 uppercase">
                          illustrative
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
            {status === 'done' && (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <BookCallButton size="md" />
                <button type="button" onClick={startOver} className={secondaryButton}>
                  Try another company
                </button>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="px-5 py-6">
            <div className="mt-2 border-l-2 border-ink pl-4">
              <p className="max-w-[38ch] text-[15px] leading-relaxed font-medium">
                The analysis did not complete.
              </p>
              <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-ink/70">
                Retry, try another company, or book a call and we will run it live.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={() => void run(target)} className={secondaryButton}>
                Retry
              </button>
              <button type="button" onClick={startOver} className={secondaryButton}>
                Try another company
              </button>
              <BookCallButton variant="quiet" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
