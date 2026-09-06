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
 * The hairline-bounded label strip that opens every section:
 * 11px uppercase 0.18em tracked labels, with a real number or link
 * pinned to the right side of the band.
 */
export function SectionBand({ left, right, className, tone = 'light' }: SectionBandProps) {
  const dark = tone === 'dark';
  const label = dark ? 'text-ghost/60' : 'text-ink/60';
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-b px-5 py-5 md:px-10',
        dark ? 'border-hairline-ghost' : 'border-hairline',
        className,
      )}
    >
      <span className={cn('text-[11px] tracking-[0.18em] uppercase', label)}>{left}</span>
      {right != null && (
        <span className={cn('tnum text-right text-[11px] tracking-[0.18em] uppercase', label)}>
          {right}
        </span>
      )}
    </div>
  );
}
