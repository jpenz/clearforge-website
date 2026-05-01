const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^\[?::1\]?$/i,
];

export function normalizePublicCompanyUrl(value: unknown): URL | null {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 300) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;

    const hostname = parsed.hostname.toLowerCase();
    if (
      !hostname.includes('.') ||
      PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
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
