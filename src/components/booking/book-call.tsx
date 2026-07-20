'use client';

import type { getCalApi } from '@calcom/embed-react';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const Cal = dynamic(() => import('@calcom/embed-react'), { ssr: false });

/**
 * Cal.com booking — the journey's highest-impact conversion fix (embedded
 * scheduling lifts request-to-book >50%; first responder wins ~78% of deals).
 * Meeting location: Microsoft Teams (enabled as the Cal.com event default,
 * confirmed 2026-07-14).
 *
 * Perf contract: BookCallButton loads Cal's third-party embed JS on INTENT
 * (hover/focus preload, click opens) — never on page load. Only
 * BookingInline (/contact) loads it eagerly, because that page IS intent.
 */

export const CAL_LINK = 'james-penz/30min';
const CAL_NAMESPACE = '30min';
const BRAND = '#1F4CDB';

let calReady: Promise<Awaited<ReturnType<typeof getCalApi>>> | null = null;

function loadCal() {
  calReady ??= import('@calcom/embed-react')
    .then((m) => m.getCalApi({ namespace: CAL_NAMESPACE }))
    .then((cal) => {
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackEvent('generate_lead', { method: 'cal_booking' });
        },
      });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': BRAND },
          dark: { 'cal-brand': '#7A97FF' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      return cal;
    });
  return calReady;
}

/** Inline calendar — for /contact. Eager: this page is booking intent. */
export function BookingInline({ className }: { className?: string }) {
  useEffect(() => {
    void loadCal();
  }, []);
  return (
    <div className={className}>
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        config={{ layout: 'month_view', theme: 'light' }}
      />
    </div>
  );
}

/** Popup trigger — loads the embed on hover/focus, opens on click. */
export function BookCallButton({
  children,
  analytics,
  ...buttonProps
}: ButtonProps & { analytics?: string }) {
  const opening = useRef(false);

  const preload = useCallback(() => {
    void loadCal().then((cal) => {
      cal('preload', { calLink: CAL_LINK });
    });
  }, []);

  const open = useCallback(async () => {
    if (opening.current) return;
    opening.current = true;
    try {
      const cal = await loadCal();
      cal('modal', {
        calLink: CAL_LINK,
        config: { layout: 'month_view', theme: 'light' },
      });
    } finally {
      opening.current = false;
    }
  }, []);

  return (
    <Button
      {...buttonProps}
      onPointerEnter={preload}
      onFocus={preload}
      onClick={open}
      data-analytics={analytics}
    >
      {children ?? (
        <>
          Book a 30-min intro <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
