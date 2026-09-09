'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * The six primary links with an active-route underline cue. The header
 * is dark, so the accent is cobalt-bright (cobalt fails contrast on ink).
 * Below md the links wrap onto two rows inside the header, so the padding
 * is tighter there and every destination is visible without scrolling.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'py-1.5 transition-colors md:py-2.5',
              active
                ? 'font-semibold text-cobalt-bright underline decoration-2 underline-offset-4 md:underline-offset-8'
                : 'text-ghost/75 hover:text-cobalt-bright',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
