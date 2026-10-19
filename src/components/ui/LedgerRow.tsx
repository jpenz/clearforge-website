import type { ReactNode } from 'react';

interface LedgerRowProps {
  /** The ledger mark. Decorative: the eyebrow beside it already names the step. */
  marker: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  /** Omit the bottom rule on the last row of a run. */
  rule?: boolean;
  id?: string;
}

/**
 * One row of a register: the ledger mark set large and quiet on the
 * left, the step and its conclusion in the middle, the detail across a
 * vertical hairline on the right. The mark is aria-hidden because the
 * eyebrow beside it carries the same step number as real text.
 */
export function LedgerRow({ marker, eyebrow, title, children, rule = true, id }: LedgerRowProps) {
  return (
    <div
      id={id}
      className={`grid scroll-mt-24 items-start gap-x-8 gap-y-5 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[minmax(120px,0.55fr)_1.45fr_2fr] lg:gap-x-12 ${
        rule ? 'border-b border-hairline' : ''
      }`}
    >
      <p
        aria-hidden="true"
        className="font-display tnum text-[clamp(64px,7vw,110px)] leading-[0.85] font-medium text-ink/15 select-none"
      >
        {marker}
      </p>
      <div>
        <p className="tnum text-[12px] tracking-[0.16em] text-ink/70 uppercase">{eyebrow}</p>
        <div className="mt-3">{title}</div>
      </div>
      <div className="lg:border-l lg:border-hairline lg:pl-12">{children}</div>
    </div>
  );
}
