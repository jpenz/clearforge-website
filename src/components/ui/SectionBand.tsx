import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionBandProps {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
  /** 'dark' renders the strip in ghost ink for use inside a dark band. */
  tone?: 'light' | 'dark';
}

/**
 * The hairline-bounded label strip that opens a section: the section name
 * at 12px full ink on the left (it is the page's you-are-here on interior
 * routes, so it is never the faintest text on the page), and a qualifying
 * phrase or link at 12px ink/70 on the right.
 */
export function SectionBand({ left, right, className, tone = 'light' }: SectionBandProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-b px-5 py-5 md:px-10',
        dark ? 'border-hairline-ghost' : 'border-hairline',
        className,
      )}
    >
      <span
        className={cn(
          'text-[12px] font-semibold tracking-[0.16em] uppercase',
          dark ? 'text-ghost' : 'text-ink',
        )}
      >
        {left}
      </span>
      {right != null && (
        <span
          className={cn(
            'tnum text-right text-[12px] tracking-[0.16em] uppercase',
            dark ? 'text-ghost/80' : 'text-ink/70',
          )}
        >
          {right}
        </span>
      )}
    </div>
  );
}
