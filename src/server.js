import app from "./app.js";

import { env } from "./config/env.js";

import logger from "./utils/logger.js";

import { connectDatabase } from "./prisma/client.js";

const PORT = env.PORT;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    logger.info({
      event: "SERVER_STARTED",
      port: PORT,
      environment: env.NODE_ENV,
    });
  });
};

startServer();