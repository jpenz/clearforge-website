const buckets = new Map<string, { count: number; resetAt: number }>();
let lastCleanupAt = 0;

function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
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
