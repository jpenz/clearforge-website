'use client';

import { useEffect, useRef, useState } from 'react';
import { CAL_NAMESPACE, CTA_LABEL } from '@/data/site';
import { openCalModal, preloadCal } from '@/lib/cal';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'link' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

interface BookCallButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  solid:
    'bg-cobalt text-white transition-shadow hover:bg-cobalt-press hover:shadow-[0_6px_28px_rgba(36,84,255,0.45)]',
  outline: 'border border-hairline-strong text-ink hover:border-ink',
  link: 'text-cobalt underline underline-offset-4 hover:text-cobalt-press',
  quiet: 'underline underline-offset-4 hover:text-cobalt',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[14px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-7 py-4 text-[15px]',
};

const isBoxed = (variant: Variant) => variant === 'solid' || variant === 'outline';

/** How long the opening state stays after Cal's modal call returns, so the cue covers the iframe paint. */
const SETTLE_MS = 800;

/**
 * The canonical booking button. Opens the Cal.com scheduling modal.
 * Label is always exactly "Book a 30-min intro".
 *
 * Cal's embed JS loads on intent (hover/focus/touch), never on page load;
 * the click opens the modal programmatically. Between the click and the
 * modal the button carries an opening state (aria-busy plus a spinning
 * square inside it, label unchanged) so the reader sees the click land.
 * bookingSuccessful fires the generate_lead conversion (wired once, in
 * lib/cal).
 */
export function BookCallButton({ variant = 'solid', size = 'sm', className }: BookCallButtonProps) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | null>(null);
  const preload = () => preloadCal(CAL_NAMESPACE);

  useEffect(
    () => () => {
      if (timer.current != null) window.clearTimeout(timer.current);
    },
    [],
  );

  const open = () => {
    if (opening) return;
    setOpening(true);
    openCalModal(CAL_NAMESPACE).finally(() => {
      timer.current = window.setTimeout(() => setOpening(false), SETTLE_MS);
    });
  };

  return (
    <button
      type="button"
      aria-busy={opening || undefined}
      onMouseEnter={preload}
      onFocus={preload}
      onTouchStart={preload}
      onClick={open}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2.5 text-center font-semibold transition-colors',
        isBoxed(variant) && sizeClasses[size],
        !isBoxed(variant) && 'text-[13px]',
        variantClasses[variant],
        className,
      )}
    >
      {CTA_LABEL}
      {opening && (
        <span
          aria-hidden="true"
          className="inline-block size-2.5 shrink-0 border-2 border-current motion-safe:animate-spin"
        />
      )}
    </button>
  );
}
