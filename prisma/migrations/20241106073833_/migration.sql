-- CreateEnum
CREATE TYPE "SlotType" AS ENUM ('HEAD', 'NECK', 'SHOULDERS', 'CHEST', 'BACK', 'ARMS', 'HANDS', 'WAIST', 'LEGS', 'FEET', 'MAIN_HAND', 'OFF_HAND', 'TWO_HAND', 'RING_1', 'RING_2');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'SMALL', 'MEDIUM', 'LARGE', 'HUGE', 'GARGANTUAN');

-- CreateEnum
CREATE TYPE "Ability" AS ENUM ('STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA');

-- CreateEnum
CREATE TYPE "ArmorType" AS ENUM ('LIGHT', 'MEDIUM', 'HEAVY', 'SHIELD');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('SLASHING', 'PIERCING', 'BLUDGEONING', 'ACID', 'COLD', 'FIRE', 'FORCE', 'LIGHTNING', 'NECROTIC', 'POISON', 'PSYCHIC', 'RADIANT', 'THUNDER');

-- CreateEnum
CREATE TYPE "SpellSchool" AS ENUM ('ABJURATION', 'CONJURATION', 'DIVINATION', 'ENCHANTMENT', 'EVOCATION', 'ILLUSION', 'NECROMANCY', 'TRANSMUTATION');

-- CreateEnum
CREATE TYPE "weaponType" AS ENUM ('FLAIL', 'MORNINGSTAR', 'RAPIER', 'SCHIMITAR', 'SHORTSWORD', 'WARPICK', 'BATTLEAXE', 'LONGSWORD', 'TRIDENT', 'WARHAMMER', 'GLAIVE', 'GREATAXE', 'GREATSWORD', 'HALBERD', 'MAUL', 'PIKE', 'HANDCROSSBOW', 'HEAVYCROSSBOW', 'LONGBOW', 'CLUB', 'DAGGER', 'HANDAXE', 'JAVELIN', 'LIGHTHAMMER', 'MACE', 'SICKLE', 'QUARTERSTAFF', 'SPEAR', 'GREATCLUB', 'LIGHTCROSSBOW', 'SHORTBOW');

-- CreateEnum
CREATE TYPE "weaponArchitype" AS ENUM ('MARTIAL', 'SIMPLE');

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "playable" BOOLEAN NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 30,
    "darkvision" BOOLEAN NOT NULL DEFAULT false,
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "hitDie" INTEGER NOT NULL,
    "primaryAbility" "Ability" NOT NULL,
    "savingThrows" "Ability"[],
    "spellcasting" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subclass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Subclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "raceId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subclassId" TEXT,
    "strength" INTEGER NOT NULL DEFAULT 10,
    "dexterity" INTEGER NOT NULL DEFAULT 10,
    "constitution" INTEGER NOT NULL DEFAULT 10,
    "intelligence" INTEGER NOT NULL DEFAULT 10,
    "wisdom" INTEGER NOT NULL DEFAULT 10,
    "charisma" INTEGER NOT NULL DEFAULT 10,
    "inventoryId" TEXT,
    "equipmentId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentSlot" (
    "id" TEXT NOT NULL,
    "slotType" "SlotType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "EquipmentSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" "SpellSchool" NOT NULL,
    "castingTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT[],
    "duration" TEXT NOT NULL,
    "concentration" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSpell" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,

    CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" "weaponType" NOT NULL,
    "damage" TEXT NOT NULL,
    "twohanded" BOOLEAN NOT NULL DEFAULT false,
    "versatile" BOOLEAN NOT NULL DEFAULT true,
    "range" INTEGER,
    "architype" "weaponArchitype" NOT NULL DEFAULT 'SIMPLE',

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_characterId_key" ON "Inventory"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_characterId_key" ON "Equipment"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- AddForeignKey
ALTER TABLE "Subclass" ADD CONSTRAINT "Subclass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_subclassId_fkey" FOREIGN KEY ("subclassId") REFERENCES "Subclass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentSlot" ADD CONSTRAINT "EquipmentSlot_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
