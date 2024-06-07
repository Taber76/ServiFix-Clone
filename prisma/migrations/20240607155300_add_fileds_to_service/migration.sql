-- AlterTable
ALTER TABLE "services" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "title" TEXT,
ADD COLUMN     "username" TEXT;
