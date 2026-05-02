'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const trackedDestinations = ['/discover', '/contact', '/scorecard', '/operating-model'];

function cleanText(value: string | null | undefined) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 90) || undefined;
}

export function AnalyticsTracker() {
  useEffect(() => {
    trackEvent('page_view');

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const element = target?.closest<HTMLElement>('a, button');
      if (!element) return;

      const explicitEvent = element.dataset.analytics;
      const href = element instanceof HTMLAnchorElement ? element.getAttribute('href') : undefined;
      const shouldTrack =
        explicitEvent || (href ? trackedDestinations.some((path) => href.startsWith(path)) : false);

      if (!shouldTrack) return;

      trackEvent(explicitEvent || 'cta_click', {
        href,
        label: cleanText(element.textContent),
        element_type: element.tagName.toLowerCase(),
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
