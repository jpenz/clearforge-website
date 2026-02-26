"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-white py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="metric-display text-4xl">Error</span>
        <h1 className="mt-4 text-3xl text-midnight" style={{ fontFamily: "var(--font-libre-bodoni)" }}>
          Something went wrong
        </h1>
        <p className="mt-2 text-base text-stone">Please try again.</p>
        <Button className="mt-8" onClick={reset}>
          Try Again
        </Button>
        <p className="sr-only">{error.message}</p>
      </div>
    </section>
  );
}
