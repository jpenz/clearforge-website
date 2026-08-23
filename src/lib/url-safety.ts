const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /\.local$/i,
  /\.internal$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // link-local + AWS/GCP metadata 169.254.169.254
  /^0\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./, // 100.64/10 carrier-grade NAT
  /^\[?::1\]?$/i, // IPv6 loopback
  /^\[?fe80:/i, // IPv6 link-local
  /^\[?fc00:/i, // IPv6 unique-local
  /^\[?fd[0-9a-f]{2}:/i,
  /^\[?::ffff:/i, // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1)
];

/**
 * Reject IPs written in non-dotted-decimal forms that the platform resolver
 * still accepts but our denylist would miss (octal 0177..., hex 0x7f...,
 * bare decimal 2130706433). If a hostname is all-numeric or hex-ish with no
 * letters and no normal dotted-quad shape, treat it as suspicious.
 */
function isEncodedIpLiteral(hostname: string): boolean {
  const h = hostname.replace(/^\[|\]$/g, "");
  if (/^0x[0-9a-f]+$/i.test(h)) return true; // whole-host hex
  if (/^0[0-7]+$/.test(h)) return true; // whole-host octal
  if (/^\d{8,10}$/.test(h)) return true; // 32-bit decimal
  if (/^\d+(\.\d+){0,2}$/.test(h)) return true; // short-form dotted (1.1, 0.1)
  // Per-octet octal/hex inside a dotted quad: 0177.0.0.1, 0x7f.0.0.1
  if (h.includes(".")) {
    const octets = h.split(".");
    if (octets.some((o) => /^0x[0-9a-f]+$/i.test(o) || /^0[0-7]+$/.test(o))) {
      return true;
    }
  }
  return false;
}

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
      isEncodedIpLiteral(hostname) ||
      PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname))
    ) {
      return null;
    }

    // No credentials in the URL (user:pass@host is an SSRF/phishing vector).
    if (parsed.username || parsed.password) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function getCompanyDomain(value: unknown): string | null {
  const parsed = normalizePublicCompanyUrl(value);
  return parsed?.hostname.replace(/^www\./, '') ?? null;
}

/**
 * Post-resolution SSRF guard: the string checks above cannot catch a public
 * hostname whose DNS A/AAAA record points at a private IP (e.g. an attacker
 * domain resolving to 127.0.0.1 or 169.254.169.254). Resolve every address
 * and reject if any is private. Residual: a sub-second DNS-rebinding flip
 * between this lookup and fetch's connect is not closed here (would require
 * pinning the connection to the resolved IP via a custom dispatcher); the
 * analyzer's blind-SSRF surface with no meaningful exfiltration makes that
 * an accepted residual. Fails OPEN on resolver error so a flaky DNS does not
 * break the feature, matching the analyzer's graceful-degradation contract.
 */
export async function resolvesToPublicIp(hostname: string): Promise<boolean> {
  try {
    const { lookup } = await import('node:dns/promises');
    const records = await lookup(hostname, { all: true });
    if (!records.length) return true;
    return records.every(({ address }) => !isPrivateIp(address));
  } catch {
    return true;
  }
}

function isPrivateIp(ip: string): boolean {
  const v4 = ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  return PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(v4));
}
