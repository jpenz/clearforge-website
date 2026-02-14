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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-400/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-text-primary sm:text-3xl">
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
