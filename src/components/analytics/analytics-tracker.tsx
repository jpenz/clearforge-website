'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const trackedDestinations = [
  '/discover',
  '/contact',
  '/scorecard',
  '/operating-model',
  '/case-studies',
  '/services',
  '/use-cases',
  '/industries',
  '/pricing',
];

const scrollDepthThresholds = [25, 50, 75, 90];
const timeMilestones = [
  { event: 'engaged_time_30s', delay: 30_000 },
  { event: 'engaged_time_90s', delay: 90_000 },
];

function cleanText(value: string | null | undefined) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 90) || undefined;
}

function isTrackedHref(href: string | undefined) {
  if (!href) return false;

  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true;

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return true;
    return trackedDestinations.some((path) => url.pathname.startsWith(path));
  } catch {
    return trackedDestinations.some((path) => href.startsWith(path));
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view', { route_path: pathname ?? window.location.pathname });

    const trackedDepths = new Set<number>();
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const documentHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        );
        const viewportBottom = window.scrollY + window.innerHeight;
        const depth = Math.round((viewportBottom / documentHeight) * 100);

        for (const threshold of scrollDepthThresholds) {
          if (depth >= threshold && !trackedDepths.has(threshold)) {
            trackedDepths.add(threshold);
            trackEvent('scroll_depth', { depth_percent: threshold });
          }
        }

        ticking = false;
      });
    };

    const timers = timeMilestones.map((milestone) =>
      window.setTimeout(() => trackEvent(milestone.event), milestone.delay),
    );

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const element = target?.closest<HTMLElement>('a, button');
      if (!element) return;

      const explicitEvent = element.dataset.analytics;
      const href =
        element instanceof HTMLAnchorElement
          ? (element.getAttribute('href') ?? undefined)
          : undefined;
      const shouldTrack = explicitEvent || isTrackedHref(href);

      if (!shouldTrack) return;

      trackEvent(explicitEvent || 'cta_click', {
        href,
        label: cleanText(element.textContent),
        element_type: element.tagName.toLowerCase(),
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = (event.target as Element | null)?.closest<HTMLFormElement>('form');
      if (!form) return;

      trackEvent(form.dataset.analytics || 'form_submit_attempt', {
        form_id: form.id || undefined,
        form_name: form.getAttribute('name') || undefined,
        form_action: form.getAttribute('action') || undefined,
      });
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return null;
}
