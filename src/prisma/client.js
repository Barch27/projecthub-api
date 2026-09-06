import "dotenv/config";
import { env } from "../config/env.js"
import logger from "../utils/logger.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export const connectDatabase = async () => {
  try {
    await prisma.$connect();

    logger.info({
      event: "DATABASE_CONNECTED",
    });
  } catch (error) {
    logger.fatal({
      event: "DATABASE_CONNECTION_FAILED",
      message: error.message,
    });

    process.exit(1);
  }
};

export default prisma;