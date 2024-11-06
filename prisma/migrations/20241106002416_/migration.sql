/*
  Warnings:

  - You are about to drop the column `learnedSpells` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `equipedWeapon` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `weaponlist` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `damageType` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `enchantment` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the `Armor` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SlotType" AS ENUM ('HEAD', 'NECK', 'SHOULDERS', 'CHEST', 'BACK', 'ARMS', 'HANDS', 'WAIST', 'LEGS', 'FEET', 'MAIN_HAND', 'OFF_HAND', 'TWO_HAND', 'RING_1', 'RING_2');

-- DropForeignKey
ALTER TABLE "Armor" DROP CONSTRAINT "Armor_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_learnedSpells_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_equipedWeapon_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_weaponlist_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "learnedSpells",
ADD COLUMN     "equipmentId" TEXT,
ADD COLUMN     "inventoryId" TEXT;

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "equipedWeapon";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "weaponlist",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "value",
DROP COLUMN "weight",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "damageType",
DROP COLUMN "enchantment",
ALTER COLUMN "type" DROP DEFAULT,
ALTER COLUMN "range" DROP NOT NULL;

-- DropTable
DROP TABLE "Armor";

-- CreateTable
CREATE TABLE "EquipmentSlot" (
    "id" TEXT NOT NULL,
    "slotType" "SlotType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "EquipmentSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSpell" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "learnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EquipmentSlot" ADD CONSTRAINT "EquipmentSlot_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
