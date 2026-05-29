'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function getHashTarget() {
  const hash = window.location.hash;
  if (!hash) return null;

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return document.getElementById(hash.slice(1));
  }
}

function scrollToRouteStart() {
  document.scrollingElement?.scrollTo({ left: 0, top: 0, behavior: 'auto' });
  window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function settleScrollPosition() {
  const target = getHashTarget();
  if (target) {
    target.scrollIntoView({ block: 'start' });
    return;
  }

  scrollToRouteStart();
}

export function RouteScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const frame = window.requestAnimationFrame(settleScrollPosition);
    const timers = [80, 240, 600, 1000].map((delay) =>
      window.setTimeout(settleScrollPosition, delay),
    );

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('hashchange', settleScrollPosition);
    return () => window.removeEventListener('hashchange', settleScrollPosition);
  }, []);

  return null;
}
