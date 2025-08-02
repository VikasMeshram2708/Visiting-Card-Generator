import { LRUCache } from "lru-cache";
import { headers } from "next/headers";

const RATE_LIMIT = 10; // 10 requests per minute
const INTERVAL = 60 * 1000; // 1 minute in ms

const tokenCache = new LRUCache<string, number>({
  max: 500, // Max unique IPs tracked
  ttl: INTERVAL,
});

export async function checkRateLimit(): Promise<{
  isRateLimited: boolean;
  remaining: number;
  resetTime: number;
}> {
  const headersList = await headers(); // Await the headers
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "local-dev";

  const tokenCount = tokenCache.get(ip) || 0;
  tokenCache.set(ip, tokenCount + 1);

  return {
    isRateLimited: tokenCount >= RATE_LIMIT,
    remaining: Math.max(0, RATE_LIMIT - (tokenCount + 1)),
    resetTime: tokenCache.getRemainingTTL(ip),
  };
}
