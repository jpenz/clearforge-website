declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsValue | AnalyticsValue[]>;

const sessionStorageKey = 'clearforge_session_id';
const firstTouchStorageKey = 'clearforge_first_touch';

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

type UtmKey = (typeof utmKeys)[number];

type FirstTouch = Partial<Record<UtmKey, string>> & {
  first_seen_at: string;
  landing_page: string;
  referrer?: string;
};

function getStorage(type: 'localStorage' | 'sessionStorage') {
  try {
    return window[type];
  } catch {
    return undefined;
  }
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function safeGetStorage(storage: Storage | undefined, key: string) {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSetStorage(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
  } catch {
    // Storage can be disabled by privacy settings; analytics should never break the page.
  }
}

function getSessionId() {
  const sessionStorage = getStorage('sessionStorage');
  const existing = safeGetStorage(sessionStorage, sessionStorageKey);
  if (existing) return existing;

  const sessionId = createId('cf_session');
  safeSetStorage(sessionStorage, sessionStorageKey, sessionId);
  return sessionId;
}

function getCurrentUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return utmKeys.reduce<Partial<Record<UtmKey, string>>>((acc, key) => {
    const value = params.get(key);
    if (value) acc[key] = value.slice(0, 200);
    return acc;
  }, {});
}

function getFirstTouch(): FirstTouch {
  const localStorage = getStorage('localStorage');
  const stored = safeGetStorage(localStorage, firstTouchStorageKey);
  if (stored) {
    try {
      return JSON.parse(stored) as FirstTouch;
    } catch {
      // Fall through and replace malformed attribution data.
    }
  }

  const firstTouch: FirstTouch = {
    ...getCurrentUtmParams(),
    first_seen_at: new Date().toISOString(),
    landing_page: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
  };

  safeSetStorage(localStorage, firstTouchStorageKey, JSON.stringify(firstTouch));
  return firstTouch;
}

function getAttributionProperties(firstTouch: FirstTouch) {
  const currentUtm = getCurrentUtmParams();
  const attribution: Record<string, string | undefined> = {
    landing_page: firstTouch.landing_page,
    first_referrer: firstTouch.referrer,
    first_seen_at: firstTouch.first_seen_at,
  };

  for (const key of utmKeys) {
    attribution[`first_${key}`] = firstTouch[key];
    attribution[`current_${key}`] = currentUtm[key];
  }

  return attribution;
}

function compactProperties(properties: AnalyticsProperties) {
  return Object.entries(properties).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

function sendToServer(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      '/api/analytics',
      new Blob([body], { type: 'application/json' }),
    );
    if (sent) return;
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Network failures should not affect navigation or conversion flows.
  });
}

export function trackEvent(name: string, properties: AnalyticsProperties = {}) {
  if (typeof window === 'undefined') return;

  const compactedProperties = compactProperties(properties);
  const firstTouch = getFirstTouch();
  const attribution = getAttributionProperties(firstTouch);
  const pagePath = `${window.location.pathname}${window.location.search}`;
  const eventId = createId('cf_event');

  const payload = {
    event: name,
    event_id: eventId,
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    page_path: pagePath,
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || undefined,
    ...attribution,
    ...compactedProperties,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  window.gtag?.('event', name, {
    event_id: eventId,
    page_path: pagePath,
    ...attribution,
    ...compactedProperties,
  });

  window.plausible?.(name, { props: { ...attribution, ...compactedProperties } });
  sendToServer({
    name,
    event_id: eventId,
    session_id: payload.session_id,
    timestamp: payload.timestamp,
    page_path: pagePath,
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || undefined,
    landing_page: firstTouch.landing_page,
    attribution,
    properties: compactedProperties,
  });
  window.dispatchEvent(new CustomEvent('clearforge:analytics', { detail: payload }));
}
