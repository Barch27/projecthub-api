import { createClient } from "redis";
import { env } from "../config/env.js"
import logger from "../utils/logger.js";

const redis = createClient({
  url: env.REDIS_URL,
});

redis.on("connect", () => {
  logger.info({
    event: "REDIS_CONNECTING",
  });
});

redis.on("ready", () => {
  logger.info({
    event: "REDIS_READY",
  });
});

redis.on("error", (error) => {
  logger.error({
    event: "REDIS_ERROR",
    message: error.message,
  });
});

redis.on("end", () => {
  logger.warn({
    event: "REDIS_DISCONNECTED",
  });
});

await redis.connect();

export default redis;