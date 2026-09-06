import { createClient } from "redis";
import { env } from "../config/env.js"

const redis = createClient({
  url: env.REDIS_URL,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

await redis.connect();

export default redis;