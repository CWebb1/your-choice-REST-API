/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Race` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Race" DROP COLUMN "createdAt",
DROP COLUMN "type",
DROP COLUMN "updatedAt";

-- DropEnum
DROP TYPE "raceType";
