const buckets = new Map<string, { count: number; resetAt: number }>();
let lastCleanupAt = 0;

function getClientIp(headers: Headers): string {
  // On Vercel x-real-ip is set by the platform to the true client IP and is
  // not client-appendable; prefer it over x-forwarded-for, whose leftmost
  // value a caller can spoof to rotate past the limit.
  return (
    headers.get('x-real-ip')?.trim() ||
    headers.get('x-forwarded-for')?.split(',').pop()?.trim() ||
    'unknown'
  );
}

export function isRateLimited(
  headers: Headers,
  namespace: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  if (now - lastCleanupAt > windowMs) {
    for (const [key, entry] of buckets.entries()) {
      if (now > entry.resetAt) {
        buckets.delete(key);
      }
    }
    lastCleanupAt = now;
  }

  const key = `${namespace}:${getClientIp(headers)}`;
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > maxRequests;
}
