import app from "./app.js";

import { env } from "./config/env.js";

import logger from "./utils/logger.js";

import { connectDatabase } from "./prisma/client.js";
import { connectRedis } from "./redis/client.js";

const PORT = env.PORT;

const startServer = async () => {

  try {
    await connectDatabase();
    await connectRedis();
    app.listen(PORT, () => {
      logger.info({
        event: "SERVER_STARTED",
        message: "Hot reload works!",
        port: PORT,
        environment: env.NODE_ENV,
      });
    });
  } catch (error) {
    logger.fatal({
      event: "APPLICATION_STARTUP_FAILED",
      message: error.message,
    });

    process.exit(1);
  }
  
};

startServer();