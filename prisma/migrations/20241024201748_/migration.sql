-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "subclassId" TEXT NOT NULL,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "classname" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subclasses" (
    "id" TEXT NOT NULL,
    "subclassname" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "features" TEXT[],
    "classId" TEXT NOT NULL,

    CONSTRAINT "Subclasses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classes_classname_key" ON "Classes"("classname");

-- CreateIndex
CREATE UNIQUE INDEX "Subclasses_subclassname_key" ON "Subclasses"("subclassname");

-- CreateIndex
CREATE UNIQUE INDEX "Subclasses_classId_key" ON "Subclasses"("classId");

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_subclassId_fkey" FOREIGN KEY ("subclassId") REFERENCES "Subclasses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subclasses" ADD CONSTRAINT "Subclasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
