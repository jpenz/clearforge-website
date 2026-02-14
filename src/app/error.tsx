"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto max-w-md">
        <AlertTriangle className="mx-auto h-10 w-10 text-molten-amber" />
        <h1 className="mt-6 font-serif text-2xl text-forge-navy sm:text-3xl">
          Something Went Wrong
        </h1>
        <p className="mt-4 text-text-secondary">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <Button onClick={reset} className="mt-8 gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
