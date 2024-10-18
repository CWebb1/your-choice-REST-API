-- CreateEnum
CREATE TYPE "raceType" AS ENUM ('HUMAN', 'ELF', 'DROW', 'HALFELF', 'HALFORC', 'HALFLING', 'DWARF', 'GNOME', 'TIEFLING', 'GITHYANKI', 'DRAGONBORN');

-- CreateEnum
CREATE TYPE "weaponType" AS ENUM ('FLAIL', 'MORNINGSTAR', 'RAPIER', 'SCHIMITAR', 'SHORTSWORD', 'WARPICK', 'BATTLEAXE', 'LONGSWORD', 'TRIDENT', 'WARHAMMER', 'GLAIVE', 'GREATAXE', 'GREATSWORD', 'HALBERD', 'MAUL', 'PIKE', 'HANDCROSSBOW', 'HEAVYCROSSBOW', 'LONGBOW', 'CLUB', 'DAGGER', 'HANDAXE', 'JAVELIN', 'LIGHTHAMMER', 'MACE', 'SICKLE', 'QUARTERSTAFF', 'SPEAR', 'GREATCLUB', 'LIGHTCROSSBOW', 'SHORTBOW');

-- CreateEnum
CREATE TYPE "weaponArchitype" AS ENUM ('MARTIAL', 'SIMPLE');

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "Type" "raceType" NOT NULL DEFAULT 'HUMAN',
    "playable" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "enchantment" INTEGER,
    "type" "weaponType" NOT NULL DEFAULT 'DAGGER',
    "architype" "weaponArchitype" NOT NULL DEFAULT 'SIMPLE',
    "twohanded" BOOLEAN NOT NULL DEFAULT false,
    "versatile" BOOLEAN NOT NULL DEFAULT true,
    "range" INTEGER NOT NULL,

    CONSTRAINT "Weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");
