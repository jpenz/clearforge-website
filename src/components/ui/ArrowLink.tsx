import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ArrowLinkProps {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  /** 'dark' renders cobalt-bright for use on a dark band or plate. */
  tone?: 'light' | 'dark';
  /** A right arrow for a route, a down arrow for an in-page jump. */
  arrow?: '→' | '↓';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * The one "go" link on the site: cobalt text plus an arrow, no underline,
 * cobalt-bright on dark. Every text link that leads somewhere uses this,
 * so the same signifier means the same thing on every route.
 */
export function ArrowLink({
  href,
  children,
  tone = 'light',
  arrow = '→',
  size = 'md',
  className,
}: ArrowLinkProps) {
  const dark = tone === 'dark';
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-semibold transition-colors',
        size === 'sm' ? 'text-[14px]' : 'text-[16px]',
        dark
          ? 'text-cobalt-bright hover:text-ghost focus-visible:outline-cobalt-bright'
          : 'text-cobalt hover:text-cobalt-press',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          'inline-block transition-transform duration-200 motion-reduce:transition-none',
          arrow === '→' ? 'group-hover:translate-x-1' : 'group-hover:translate-y-0.5',
        )}
      >
        {arrow}
      </span>
    </Link>
  );
}
