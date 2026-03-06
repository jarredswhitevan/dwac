const hits = new Map<string, { count: number; ts: number }>();

export function checkRateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now - entry.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
