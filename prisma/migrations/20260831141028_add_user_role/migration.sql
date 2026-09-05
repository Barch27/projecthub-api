-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';

-- Backfill NULL passwords before enforcing NOT NULL
UPDATE "User" SET "password" = 'changeme' WHERE "password" IS NULL;

-- Now enforce NOT NULL and set default
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT 'changeme';

