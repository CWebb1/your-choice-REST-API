/*
  Warnings:

  - You are about to drop the column `Type` on the `Race` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Race" DROP COLUMN "Type",
ADD COLUMN     "type" "raceType" NOT NULL DEFAULT 'HUMAN';