/*
  Warnings:

  - Made the column `rating` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `times_hired` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `num_reviews` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "times_hired" SET NOT NULL,
ALTER COLUMN "times_hired" SET DEFAULT 0,
ALTER COLUMN "num_reviews" SET NOT NULL,
ALTER COLUMN "num_reviews" SET DEFAULT 0,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
