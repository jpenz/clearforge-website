'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-parchment">
      <div className="text-center px-6">
        <h1 className="text-display">Something went wrong.</h1>
        <p className="mt-4 text-body-lg text-warm-gray">An unexpected error occurred.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
