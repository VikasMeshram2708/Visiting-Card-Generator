// lib/rateLimit.ts
import { createClient } from "redis";

const redis_URL = process.env.REDIS_URL!;
export const redisInstance = createClient({ url: redis_URL });

redisInstance.on("error", (err) => console.error("Redis Client Error", err));

if (!redisInstance.isOpen) {
  await redisInstance.connect();
}

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
  const windowStart = now - windowInSeconds;
  const keyName = `ratelimit:${key}`;

  // 🚫 Check for bad type (e.g., string instead of zset)
  const type = await redisInstance.type(keyName);
  if (type !== "zset" && type !== "none") {
    await redisInstance.del(keyName); // force reset
  }

  // 🧹 Remove outdated entries
  await redisInstance.zRemRangeByScore(keyName, 0, windowStart);

  // 🔢 Count entries within window
  const count = await redisInstance.zCard(keyName);
  const success = count < limit;

  let reset = now + windowInSeconds;

  if (success) {
    // ✅ Add current timestamp
    await redisInstance.zAdd(keyName, [{ score: now, value: `${now}` }]);
    await redisInstance.expire(keyName, windowInSeconds);
  } else {
    // ⏱ Get earliest timestamp to compute reset
    const earliest = await redisInstance.zRangeWithScores(keyName, 0, 0);
    const firstTime = earliest.length > 0 ? earliest[0].score : now;
    reset = Math.ceil(firstTime + windowInSeconds);
  }

  return {
    success,
    remaining: Math.max(limit - count, 0),
    reset,
    message: success
      ? undefined
      : `Rate limit exceeded. Try again in ${Math.max(reset - now, 0)} seconds.`,
  };
}
