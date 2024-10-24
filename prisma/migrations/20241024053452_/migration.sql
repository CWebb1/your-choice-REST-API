/*
  Warnings:

  - You are about to drop the `Weapons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Weapons";

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "enchantment" INTEGER,
    "type" "weaponType" NOT NULL DEFAULT 'DAGGER',
    "architype" "weaponArchitype" NOT NULL DEFAULT 'SIMPLE',
    "twohanded" BOOLEAN NOT NULL DEFAULT false,
    "versatile" BOOLEAN NOT NULL DEFAULT true,
    "range" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);
