/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'SUPPLIER';

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
