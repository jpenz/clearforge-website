declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const payload = {
    event: name,
    ...properties,
    page_path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  window.plausible?.(name, { props: properties });
  window.dispatchEvent(new CustomEvent('clearforge:analytics', { detail: payload }));
}
