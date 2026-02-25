"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <span className="metric-display text-4xl">Error</span>
        <h1 className="mt-4 text-2xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Something went wrong</h1>
        <p className="mt-2 text-base text-text-tertiary">Please try again.</p>
        <Button className="mt-8" onClick={reset}>Try Again</Button>
      </div>
    </section>
  );
}
