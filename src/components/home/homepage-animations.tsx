import type { ReactNode } from 'react';

/**
 * V11 "crisp" pass — these wrappers used to hide content at opacity 0 until
 * GSAP ScrollTrigger fired, which read as blank/slow (and occasionally never
 * fired at all). Bain/McKinsey render content instantly; so do we now.
 *
 * The component APIs are preserved so no call site changes, but they are
 * plain server-rendered containers: zero JS, zero hidden content, zero
 * scroll-jank. If a subtle entrance is ever wanted, use CSS scroll-driven
 * animations (compositor-thread, content visible by default) — never
 * opacity-0-until-trigger.
 */

type AnimType = 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'clip-reveal';

export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode;
  animation?: AnimType;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function PinnedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/** Time-based CSS marquee (was scroll-scrubbed GSAP). */
export function ScrubMarquee({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="mr-[4vw] shrink-0 text-[8vw] font-bold uppercase tracking-tight text-bone/[0.05] lg:text-[6vw] font-display"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
