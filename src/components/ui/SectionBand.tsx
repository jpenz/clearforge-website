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
 * phrase or link at 12px ink/70 on the right. Below md the two stack and
 * both read left-aligned, because the two-up row wrapped on both sides at
 * 390. On a dark band the right label runs at full ghost: at 12px the /80
 * modifier put it in the marginal zone over a lit plate.
 */
export function SectionBand({ left, right, className, tone = 'light' }: SectionBandProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-1 border-b px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-10',
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
            'tnum text-left text-[12px] tracking-[0.16em] uppercase md:text-right',
            dark ? 'text-ghost' : 'text-ink/70',
          )}
        >
          {right}
        </span>
      )}
    </div>
  );
}
