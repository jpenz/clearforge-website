'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';

/**
 * Cal.com booking — the journey's highest-impact conversion fix (embedded
 * scheduling lifts request-to-book >50%; first responder wins ~78% of deals).
 * Meeting location: Microsoft Teams (enabled as the Cal.com event default,
 * confirmed 2026-07-14).
 */

export const CAL_LINK = 'james-penz/30min';
const CAL_NAMESPACE = '30min';
const BRAND = '#1F4CDB';

function useCalUi() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': BRAND },
          dark: { 'cal-brand': '#7A97FF' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);
}

/** Inline calendar — for /contact. Renders the month view in-page. */
export function BookingInline({ className }: { className?: string }) {
  useCalUi();
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

/** Popup trigger — drop-in wherever a "book a call" CTA lives. */
export function BookCallButton({
  children,
  analytics,
  ...buttonProps
}: ButtonProps & { analytics?: string }) {
  useCalUi();
  return (
    <Button
      {...buttonProps}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"light"}'
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
