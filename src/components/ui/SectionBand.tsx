import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionBandProps {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
}

/**
 * The hairline-bounded label strip that opens every section:
 * 11px uppercase 0.18em tracked labels, with a real number or link
 * pinned to the right side of the band.
 */
export function SectionBand({ left, right, className }: SectionBandProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-hairline px-5 py-5 md:px-10",
        className,
      )}
    >
      <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
        {left}
      </span>
      {right != null && (
        <span className="tnum text-right text-[11px] tracking-[0.18em] text-ink/60 uppercase">
          {right}
        </span>
      )}
    </div>
  );
}
