'use client';

import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Floating Forge Intelligence bar — appears on all pages except /discover.
 * Shows after 10 seconds. Dismissible (remembers in sessionStorage).
 *
 * CellCog PRD: "Persistent bottom bar, not a chat bubble.
 * 48px height, dark navy, emerald accent."
 */
export function ForgeBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show on discover page or if dismissed.
    if (pathname === '/discover') return;
    if (sessionStorage.getItem('forge-bar-dismissed') === 'true') {
      setDismissed(true);
      return;
    }

    const showAfterIntent = () => {
      if (window.scrollY > 720) setVisible(true);
    };

    const timer = window.setTimeout(showAfterIntent, 30000);
    window.addEventListener('scroll', showAfterIntent, { passive: true });
    showAfterIntent();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', showAfterIntent);
    };
  }, [pathname]);

  if (dismissed || !visible || pathname === '/discover') return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('forge-bar-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-divider-dark bg-forge-black/92 backdrop-blur-xl animate-fade-in">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-10">
        <Link
          href="/discover"
          className="flex min-w-0 items-center gap-2 text-sm text-bone transition-colors hover:text-brass sm:gap-3"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-brass" />
          <span className="truncate">
            <span className="hidden sm:inline">Not ready for a call? </span>
            <span className="font-semibold">Generate an AI value map</span>
            <span className="hidden md:inline"> from your website</span>
          </span>
          <span className="shrink-0 text-brass">→</span>
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          className="-mr-2 shrink-0 p-2 text-stone transition-colors hover:text-bone"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
