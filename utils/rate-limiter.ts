import { createClient } from "redis";

const redis_URL = process.env.REDIS_URL! || "";

export const redisInstance = createClient({
  url: redis_URL,
});

redisInstance.on("error", (err) => console.error("Redis Client Error", err));

if (!redisInstance.isOpen) {
  await redisInstance.connect();
}

// lib/rateLimit.ts

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
  message?: string;
};

export async function rateLimit({
  key,
  limit,
  windowInSeconds,
}: {
  key: string;
  limit: number;
  windowInSeconds: number;
}): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000);
  const keyName = `ratelimit:${key}`;

  const count = await redisInstance.incr(keyName);

  if (count === 1) {
    await redisInstance.expire(keyName, windowInSeconds); // only set expiry on first hit
  }

  const ttl = await redisInstance.ttl(keyName);
  const remaining = Math.max(limit - count, 0);
  const success = count <= limit;

  return {
    success,
    remaining,
    reset: now + ttl,
    message: success
      ? undefined
      : `Rate limit exceeded. Try again in ${ttl} seconds.`,
  };
}
