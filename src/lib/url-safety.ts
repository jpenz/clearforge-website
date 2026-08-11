const MAX_COMPANY_URL_LENGTH = 300;
const MAX_REDIRECT_URL_LENGTH = 2_048;
const MAX_TRUSTED_IMAGE_URL_LENGTH = 2_048;

const PRIVATE_HOST_PATTERNS = [
  /^localhost(?:\.|$)/i,
  /\.localhost$/i,
  /\.local$/i,
  /\.internal$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^\[?::1\]?$/i,
  /^\[?fc/i,
  /^\[?fd/i,
  /^\[?fe[89ab]/i,
];

const IPV4_LITERAL_PATTERN = /^\d{1,3}(?:\.\d{1,3}){3}$/;

function isIpLiteral(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, '');
  return IPV4_LITERAL_PATTERN.test(host) || host.includes(':');
}

function normalizePublicHttpUrl(value: string, maxLength: number): URL | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (parsed.username || parsed.password || parsed.port) return null;

    const hostname = parsed.hostname.toLowerCase();
    if (
      !hostname.includes('.') ||
      isIpLiteral(hostname) ||
      PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Validates a visitor-provided public company URL before it is stored or used
 * as a remote fetch target. IP literals, credentials, and non-default ports
 * are intentionally rejected: this surface is for ordinary public websites,
 * not arbitrary network destinations.
 */
export function normalizePublicCompanyUrl(value: unknown): URL | null {
  if (typeof value !== 'string') return null;
  return normalizePublicHttpUrl(value, MAX_COMPANY_URL_LENGTH);
}

/**
 * Resolves a redirect without widening the public-target policy. Callers must
 * use this for every redirect hop rather than relying on fetch's automatic
 * redirect handling.
 */
export function resolvePublicRedirectUrl(currentUrl: URL, location: string | null): URL | null {
  if (!location || location.length > MAX_REDIRECT_URL_LENGTH) return null;

  try {
    return normalizePublicHttpUrl(new URL(location, currentUrl).href, MAX_REDIRECT_URL_LENGTH);
  } catch {
    return null;
  }
}

/**
 * Parses an allow-listed image source structurally. Prefix matching is unsafe
 * because credentials, ports, and redirects can change the actual target.
 */
export function normalizeTrustedImageUrl(value: unknown, allowedHostname: string): URL | null {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_TRUSTED_IMAGE_URL_LENGTH) return null;

  try {
    const parsed = new URL(trimmed);
    if (
      parsed.protocol !== 'https:' ||
      parsed.hostname.toLowerCase() !== allowedHostname.toLowerCase() ||
      parsed.username ||
      parsed.password ||
      parsed.port ||
      parsed.hash
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getCompanyDomain(value: unknown): string | null {
  const parsed = normalizePublicCompanyUrl(value);
  return parsed?.hostname.replace(/^www\./, '') ?? null;
}
