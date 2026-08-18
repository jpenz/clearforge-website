"use client";

import { useActionState } from "react";
import { sendContactMessage, type FormState } from "@/app/actions";

const INITIAL: FormState = { status: "idle" };

const labelClass =
  "mb-2.5 block text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase";
const inputClass =
  "w-full border border-hairline-strong bg-white px-3 py-2.5 text-[14px] placeholder:text-ink/45";

/** Short fallback message form below the inline calendar. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL,
  );

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col justify-center bg-white px-6 py-12 md:px-8">
        <p className="flex items-center gap-3 text-[16px] font-semibold">
          <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
          Message sent.
        </p>
        <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-ink/70">
          Replies come from the founder. If it is time-sensitive, the calendar
          above is faster.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="border-b border-hairline px-5 py-5 md:border-r md:px-8 md:py-6">
          <label className={labelClass} htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div className="border-b border-hairline px-5 py-5 md:px-8 md:py-6">
          <label className={labelClass} htmlFor="cf-email">
            Work email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@yourcompany.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="border-b border-hairline px-5 py-5 md:px-8 md:py-6">
        <label className={labelClass} htmlFor="cf-company">
          Company
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Yourcompany Inc."
          className={inputClass}
        />
      </div>
      <div className="border-b border-hairline px-5 py-5 md:px-8 md:py-6">
        <label className={labelClass} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Which workflow should we look at?"
          className={`${inputClass} resize-none`}
        />
      </div>
      <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        {state.status === "error" ? (
          <p role="alert" className="border-l-2 border-ink pl-3 text-[13px] text-ink/80">
            {state.message}
          </p>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer self-end bg-cobalt px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-cobalt-press disabled:opacity-40"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
