import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';

interface StatProps {
  /** The figure. A string of the form "19 to 613" renders the "to" as a small serif connector. */
  value: ReactNode;
  label: ReactNode;
  size?: Size;
  accent?: boolean;
  /** 'dark' renders ghost figures for use on a dark band. */
  tone?: 'light' | 'dark';
  className?: string;
}

const SIZE: Record<Size, string> = {
  sm: 'text-[40px]',
  md: 'text-[clamp(40px,3vw,56px)]',
  lg: 'text-[clamp(72px,7vw,128px)]',
};

function renderValue(value: ReactNode) {
  if (typeof value !== 'string') return value;
  const range = value.match(/^(\S+) to (\S+)$/);
  if (!range) return value;
  return (
    <>
      {range[1]}
      <span className="font-display mx-[0.12em] text-[0.42em] italic">to</span>
      {range[2]}
    </>
  );
}

/**
 * The one evidence figure on the site: Hanken Grotesk 300 with tabular
 * figures, the label in one line beneath. Every case number, funnel stage,
 * and scope count renders through it so a number looks the same on every
 * route.
 */
export function Stat({
  value,
  label,
  size = 'md',
  accent = false,
  tone = 'light',
  className,
}: StatProps) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <p
        className={cn(
          'tnum leading-none font-light tracking-tight',
          SIZE[size],
          accent && (dark ? 'text-cobalt-bright' : 'text-cobalt'),
        )}
      >
        {renderValue(value)}
      </p>
      <p className={cn('mt-3 text-[14px] leading-snug', dark ? 'text-ghost/70' : 'text-ink/70')}>
        {label}
      </p>
    </div>
  );
}
