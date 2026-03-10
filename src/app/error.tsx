"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-bg-deep">
      <div className="noise-texture absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-error/30 bg-error/10">
          <svg className="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1
          className="text-3xl font-bold text-text-primary lg:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Something went wrong
        </h1>
        <p className="mt-4 text-base text-text-secondary max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button variant="default" onClick={reset}>Try Again</Button>
        </div>
      </div>
    </section>
  );
}
