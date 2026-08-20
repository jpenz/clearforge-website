"use client";

import { useActionState, useRef, useState } from "react";
import { startProject, type FormState } from "@/app/actions";
import { CAL_NAMESPACE } from "@/data/site";
import { openCalModal, preloadCal } from "@/lib/cal";

const INITIAL: FormState = { status: "idle" };

const NEED_CHIPS = [
  "Diagnose a workflow",
  "Build an AI system",
  "Fix an AI we already built",
  "Adoption help",
  "Managed operations",
  "PE portfolio work",
  "Not sure yet",
];

const TIMELINES = ["Immediate", "This quarter", "This year", "Not sure"];

const labelClass =
  "mb-2.5 block text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase";
const inputClass =
  "w-full border border-hairline-strong bg-white px-3 py-2.5 text-[14px] placeholder:text-ink/45";

/**
 * Three-step project-brief intake. Step 1 costs zero typing (chips +
 * timeline), step 2 is context + optional file, step 3 is contact. The
 * confirmation offers the calendar with name/email prefilled so nothing
 * is ever asked twice.
 */
export function StartFlow() {
  const [state, formAction, pending] = useActionState(startProject, INITIAL);
  const [step, setStep] = useState(1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const contactRef = useRef({ name: "", email: "" });

  if (state.status === "success") {
    return (
      <div className="px-5 py-14 md:px-10">
        <p className="flex items-center gap-3 text-[18px] font-semibold">
          <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
          Brief received.
        </p>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
          You will hear from James within one business day. If it is
          time-sensitive, grab a slot now and we will have read your brief
          before the call.
        </p>
        <button
          type="button"
          onMouseEnter={() => preloadCal(CAL_NAMESPACE)}
          onFocus={() => preloadCal(CAL_NAMESPACE)}
          onClick={() =>
            openCalModal(CAL_NAMESPACE, {
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

  const stepLabel = (n: number, title: string) => (
    <p className="tnum text-[11px] tracking-[0.18em] text-ink/50 uppercase">
      Step {n} of 3 · {title}
    </p>
  );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const fd = new FormData(e.currentTarget);
        contactRef.current = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
        };
      }}
      className="px-5 py-10 md:px-10"
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

      <div className={step === 1 ? "" : "hidden"}>
        {stepLabel(1, "What do you need?")}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {NEED_CHIPS.map((chip) => {
            const on = needs.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  setNeeds((prev) =>
                    on ? prev.filter((c) => c !== chip) : [...prev, chip],
                  )
                }
                className={`cursor-pointer border px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  on
                    ? "border-cobalt bg-cobalt text-white"
                    : "border-hairline-strong hover:border-ink"
                }`}
              >
                {chip}
              </button>
            );
          })}
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
        <button
          type="button"
          onClick={() => setStep(2)}
          className="mt-8 cursor-pointer bg-cobalt px-6 py-3 text-[14px] font-semibold text-white hover:bg-cobalt-press"
        >
          Next
        </button>
      </div>

      <div className={step === 2 ? "" : "hidden"}>
        {stepLabel(2, "Context")}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="sf-company">
              Company
            </label>
            <input
              id="sf-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Yourcompany Inc."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-url">
              Company website{" "}
              <span className="normal-case text-ink/45">(optional)</span>
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
            Have an RFP, process doc, or data sample?{" "}
            <span className="normal-case text-ink/45">
              (optional · PDF, Word, Excel, PowerPoint · up to 10MB)
            </span>
          </label>
          <input
            id="sf-rfp"
            name="rfp"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            className="w-full cursor-pointer border border-hairline-strong bg-white px-3 py-2 text-[13px] text-ink/70 file:mr-3 file:cursor-pointer file:border-0 file:bg-cobalt file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white"
          />
        </div>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="cursor-pointer border border-hairline-strong px-6 py-3 text-[14px] font-medium hover:border-ink"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="cursor-pointer bg-cobalt px-6 py-3 text-[14px] font-semibold text-white hover:bg-cobalt-press"
          >
            Next
          </button>
        </div>
      </div>

      <div className={step === 3 ? "" : "hidden"}>
        {stepLabel(3, "Where do we reply?")}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="sf-name">
              Name
            </label>
            <input
              id="sf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-email">
              Work email
            </label>
            <input
              id="sf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@yourcompany.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sf-role">
              Role <span className="normal-case text-ink/45">(optional)</span>
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
        {state.status === "error" && (
          <p className="mt-4 text-[13px] font-medium text-cobalt-press">
            {state.message}
          </p>
        )}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="cursor-pointer border border-hairline-strong px-6 py-3 text-[14px] font-medium hover:border-ink"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer bg-cobalt px-7 py-3 text-[14px] font-semibold text-white hover:bg-cobalt-press disabled:opacity-60"
          >
            {pending ? "Sending" : "Send the brief"}
          </button>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-ink/50">
          You will hear from James within one business day. Submitting agrees
          to the{" "}
          <a href="/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          ; files are stored privately and used only to respond.
        </p>
      </div>
    </form>
  );
}
