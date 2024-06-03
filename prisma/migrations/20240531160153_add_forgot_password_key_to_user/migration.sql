-- DropIndex
DROP INDEX "message_timestamp_idx";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_reset_key" TEXT;
