/**
 * Stands in for next/dist/build/polyfills/polyfill-module (aliased in
 * next.config.ts). Next loads that file in every browser, but our targets
 * (Next's defaults: Chrome, Edge and Firefox 111, Safari 16.4) already ship
 * everything in it except URL.canParse (Chrome 120, Firefox 115, Safari 17),
 * which Next's client still calls. That is the one polyfill kept here.
 */
const url = URL as { canParse?: (input: string | URL, base?: string | URL) => boolean };

if (typeof url.canParse !== 'function') {
  url.canParse = (input, base) => {
    try {
      return Boolean(new URL(input, base));
    } catch {
      return false;
    }
  };
}

export {};
