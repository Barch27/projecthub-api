import { createClient } from "redis";
import { env } from "../config/env.js"
import logger from "../utils/logger.js";

const redis = createClient({
  url: env.REDIS_URL,

  socket: {
    connectTimeout: 5000,

    reconnectStrategy: false,
  },
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
    name: error.name,
    message: error.message || "Unable to connect to Redis.",
    code: error.code,
    stack: error.stack,
  });
});

redis.on("end", () => {
  logger.warn({
    event: "REDIS_DISCONNECTED",
  });
});

export const connectRedis = async () => {
  if (redis.isOpen) return;

  try {
    await redis.connect();

    logger.info({
      event: "REDIS_CONNECTED",
    });
  } catch (error) {
    logger.fatal({
      event: "REDIS_CONNECTION_FAILED",
      message: error.message || "Unable to connect to Redis server.",
      code: error.code,
    });

    throw error;
  }
  
};

export default redis;