import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  NODE_ENV: z.enum([
    "development",
    "production",
    "test",
  ]),

  LOG_LEVEL: z.enum([
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal",
  ]),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(10),

  JWT_REFRESH_SECRET: z.string().min(10),

  REDIS_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Environment validation failed:"
  );

  console.error(parsedEnv.error.format());

  process.exit(1);
}

export const env = parsedEnv.data;