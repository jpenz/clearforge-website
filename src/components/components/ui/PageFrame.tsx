import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageFrameProps {
  children: ReactNode;
  id?: string;
  className?: string;
  "aria-label"?: string;
  /** Draw the bottom hairline rule. Defaults to true. */
  bottomRule?: boolean;
}

/**
 * The Swiss Hairline page frame: a 1360px column with border-x hairlines
 * on the ghost-white canvas. The side frame drops away at mobile widths.
 */
export function PageFrame({
  children,
  id,
  className,
  bottomRule = true,
  ...rest
}: PageFrameProps) {
  return (
    <section
      id={id}
      aria-label={rest["aria-label"]}
      className={cn(
        "mx-auto max-w-[1360px] md:border-x border-hairline",
        bottomRule && "border-b",
        className,
      )}
    >
      {children}
    </section>
  );
}
