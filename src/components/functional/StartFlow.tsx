'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { type FormState, startProject } from '@/app/actions';
import { CAL_NAMESPACE } from '@/data/site';
import { openCalModal, preloadCal } from '@/lib/cal';

const INITIAL: FormState = { status: 'idle' };

const STEPS = [
  { title: 'What do you need?', short: 'Need' },
  { title: 'Context and files', short: 'Context and files' },
  { title: 'Where do we reply?', short: 'Where to reply' },
];

/** The seven needs, chunked so the choice reads in threes. */
const NEED_GROUPS = [
  { title: 'New system', chips: ['Diagnose a workflow', 'Build an AI system'] },
  {
    title: 'Existing system',
    chips: ['Audit an AI you already have', 'Adoption help', 'Managed operations'],
  },
  { title: 'Other', chips: ['PE portfolio work', 'Not sure yet'] },
];

const TIMELINES = ['Immediate', 'This quarter', 'This year', 'Not sure'];

const labelClass = 'mb-2.5 block text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase';
const noteClass = 'normal-case text-ink/60';
const inputClass =
  'w-full border border-hairline-strong bg-white px-3 py-2.5 text-[14px] placeholder:text-ink/45';
const primaryButton =
  'cursor-pointer bg-cobalt px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt-press disabled:opacity-60';
const secondaryButton =
  'cursor-pointer border border-hairline-strong px-6 py-4 text-[15px] font-medium hover:border-ink';

/**
 * Three-step project-brief intake. Step 1 costs zero typing (chips +
 * timeline), step 2 is context + optional file, step 3 is contact. Each
 * step validates its own required field before it advances, the step
 * heading takes focus on every change and announces itself, and when the
 * server names a missing field the flow jumps back to the step that holds
 * it. The confirmation offers the calendar with name/email prefilled so
 * nothing is ever asked twice. actions.ts is frozen; all validation here
 * is client-side and the server stays the authority.
 */
export function StartFlow() {
  const [state, formAction, pending] = useActionState(startProject, INITIAL);
  const [step, setStep] = useState(1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const contactRef = useRef({ name: '', email: '' });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // When the server names a field from an earlier step, go back to it and
  // put focus on the field so the reader lands where the fix is.
  useEffect(() => {
    if (state.status !== 'error') return;
    const missing = [
      { ref: companyRef, step: 2 },
      { ref: nameRef, step: 3 },
      { ref: emailRef, step: 3 },
    ].find((field) => !field.ref.current?.value.trim());
    if (!missing) return;
    setStep(missing.step);
    window.setTimeout(() => missing.ref.current?.focus(), 0);
  }, [state]);

  if (state.status === 'success') {
    return (
      <div className="px-5 py-14 md:px-10">
        <p className="flex items-center gap-3 text-[18px] font-semibold">
          <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
          Brief received.
        </p>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
          You will hear from James within one business day. If it is time-sensitive, grab a slot now
          and we will have read your brief before the call.
        </p>
        <button
          type="button"
          onMouseEnter={() => preloadCal(CAL_NAMESPACE)}
          onFocus={() => preloadCal(CAL_NAMESPACE)}
          onClick={() =>
            void openCalModal(CAL_NAMESPACE, {
              name: contactRef.current.name,
              email: contactRef.current.email,
            })
          }
          className="mt-7 inline-block cursor-pointer bg-cobalt px-7 py-4 text-[15px] font-semibold text-white transition-shadow hover:bg-cobalt-press hover:shadow-[0_6px_28px_rgba(36,84,255,0.45)]"
        >
          Book a 30-min intro
        </button>
      </div>
    );
  }

  /** Change step, then move focus to the step heading once it has re-rendered. */
  const goTo = (next: number) => {
    setFieldError(null);
    setStep(next);
    window.setTimeout(() => headingRef.current?.focus(), 0);
  };

  const nextFromContext = () => {
    if (!companyRef.current?.value.trim()) {
      setFieldError('Company is required.');
      companyRef.current?.focus();
      return;
    }
    goTo(3);
  };

  const current = STEPS[step - 1];

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const fd = new FormData(e.currentTarget);
        contactRef.current = {
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
        };
      }}
      className="px-5 py-8 md:px-10 md:py-10"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {/* Persist step-1 selections as real fields */}
      {needs.map((n) => (
        <input key={n} type="hidden" name="needs" value={n} />
      ))}
      <input type="hidden" name="timeline" value={timeline} />

      {/* Progress: three named segments */}
      <ol aria-label="Steps" className="grid grid-cols-3 gap-2">
        {STEPS.map((s, index) => {
          const n = index + 1;
          const done = n < step;
          const active = n === step;
          return (
            <li key={s.short} aria-current={active ? 'step' : undefined}>
              <span
                aria-hidden="true"
                className={`block h-[3px] w-full ${
                  active ? 'bg-cobalt' : done ? 'bg-ink' : 'bg-hairline'
                }`}
              />
              <span
                className={`tnum mt-2 block text-[14px] ${
                  active ? 'font-semibold text-ink' : 'text-ink/70'
                }`}
              >
                {s.short}
              </span>
            </li>
          );
        })}
      </ol>

      <h2
        ref={headingRef}
        tabIndex={-1}
        aria-live="polite"
        className="tnum mt-8 scroll-mt-[190px] text-[18px] leading-snug font-semibold outline-none md:scroll-mt-[132px]"
      >
        Step {step} of 3 · {current.title}
        {step === 1 && (
          <span className="ml-3 text-[14px] font-normal text-ink/70">Pick all that apply</span>
        )}
      </h2>

      <div className={step === 1 ? '' : 'hidden'}>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {NEED_GROUPS.map((group) => (
            <fieldset key={group.title}>
              <legend className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                {group.title}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {group.chips.map((chip) => {
                  const on = needs.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setNeeds((prev) => (on ? prev.filter((c) => c !== chip) : [...prev, chip]))
                      }
                      className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2.5 text-[14px] font-medium transition-colors ${
                        on
                          ? 'border-cobalt bg-cobalt text-white'
                          : 'border-hairline-strong hover:border-ink'
                      }`}
                    >
                      {on && <span aria-hidden="true">✓</span>}
                      {chip}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="mt-8 max-w-[280px]">
          <label className={labelClass} htmlFor="sf-timeline">
            Timeline
          </label>
          <select
            id="sf-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => goTo(2)} className={`mt-8 ${primaryButton}`}>
          Next
        </button>
      </div>

      <div className={step === 2 ? '' : 'hidden'}>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="sf-company">
              Company <span className={noteClass}>(required)</span>
            </label>
            <input
              ref={companyRef}
              id="sf-company"
              name="company"
              type="text"
              required
              aria-invalid={fieldError ? true : undefined}
              aria-describedby={fieldError ? 'sf-company-error' : undefined}
              autoComplete="organization"
              placeholder="Yourcompany Inc."
              onChange={() => fieldError && setFieldError(null)}
              className={inputClass}
            />
            {fieldError && (
              <p id="sf-company-error" className="mt-2 text-[14px] font-medium text-cobalt-press">
                {fieldError}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-url">
              Company website <span className={noteClass}>(optional)</span>
            </label>
            <input
              id="sf-url"
              name="companyUrl"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourcompany.com"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass} htmlFor="sf-success">
            What does success look like?
          </label>
          <textarea
            id="sf-success"
            name="success"
            rows={4}
            placeholder="The workflow, the pain, and what better looks like."
            className={inputClass}
          />
        </div>
        <div className="mt-5">
          <label className={labelClass} htmlFor="sf-rfp">
            Have an RFP, process doc, or data sample?{' '}
            <span className={noteClass}>
              (optional · PDF, Word, Excel, PowerPoint · up to 10MB)
            </span>
          </label>
          <input
            id="sf-rfp"
            name="rfp"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            className="w-full cursor-pointer border border-hairline-strong bg-white px-3 py-2 text-[14px] text-ink/70 file:mr-3 file:cursor-pointer file:border-0 file:bg-cobalt file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => goTo(1)} className={secondaryButton}>
            Back
          </button>
          <button type="button" onClick={nextFromContext} className={primaryButton}>
            Next
          </button>
        </div>
      </div>

      <div className={step === 3 ? '' : 'hidden'}>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="sf-name">
              Name <span className={noteClass}>(required)</span>
            </label>
            <input
              ref={nameRef}
              id="sf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-email">
              Work email <span className={noteClass}>(required)</span>
            </label>
            <input
              ref={emailRef}
              id="sf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@yourcompany.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-role">
              Role <span className={noteClass}>(optional)</span>
            </label>
            <input
              id="sf-role"
              name="role"
              type="text"
              autoComplete="organization-title"
              placeholder="Owner, COO, operating partner"
              className={inputClass}
            />
          </div>
        </div>
        {state.status === 'error' && (
          <p role="alert" className="mt-4 text-[14px] font-medium text-cobalt-press">
            {state.message}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => goTo(2)} className={secondaryButton}>
            Back
          </button>
          <button type="submit" disabled={pending} className={primaryButton}>
            {pending ? 'Sending' : 'Send the brief'}
          </button>
        </div>
        <p className="mt-4 max-w-[68ch] text-[12px] leading-relaxed text-ink/60">
          You will hear from James within one business day. Submitting agrees to the{' '}
          <a href="/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          ; files are stored privately and used only to respond.
        </p>
      </div>
    </form>
  );
}
