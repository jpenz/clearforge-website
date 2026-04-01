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
    // Don't show on discover page or if dismissed
    if (pathname === '/discover') return;
    if (sessionStorage.getItem('forge-bar-dismissed') === 'true') {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (dismissed || !visible || pathname === '/discover') return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('forge-bar-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-forge-black border-t border-divider-dark animate-fade-in">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-12 flex items-center justify-between">
        <Link
          href="/discover"
          className="flex items-center gap-3 text-sm text-bone hover:text-brass transition-colors"
        >
          <Sparkles className="h-4 w-4 text-brass" />
          <span>
            Have questions? <span className="font-semibold">Talk to Forge Intelligence</span> — get a free AI readiness report
          </span>
          <span className="text-brass">→</span>
        </Link>
        <button
          onClick={handleDismiss}
          className="text-stone hover:text-bone transition-colors p-1"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
