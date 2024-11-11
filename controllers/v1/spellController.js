import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getAllSpells = async (req, res) => {
  try {
    const spells = await prisma.spell.findMany({
      include: {
        characterSpells: true,
      },
    });
    res.status(200).json(spells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpellById = async (req, res) => {
  try {
    const spell = await prisma.spell.findUnique({
      where: { id: req.params.id },
      include: {
        characterSpells: true,
      },
    });

    if (!spell) {
      return res.status(404).json({ message: "Spell not found" });
    }

    res.status(200).json(spell);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSpell = async (req, res) => {
  try {
    const {
      name,
      desc,
      level,
      school,
      castingTime,
      range,
      components,
      duration,
      concentration,
    } = req.body;

    // Validate spell level
    if (level < 0 || level > 9) {
      return res
        .status(400)
        .json({ error: "Spell level must be between 0 and 9" });
    }

    const spell = await prisma.spell.create({
      data: {
        name,
        desc,
        level,
        school,
        castingTime,
        range,
        components,
        duration,
        concentration,
      },
    });

    res.status(201).json(spell);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Spell with this name already exists" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const updateSpell = async (req, res) => {
  try {
    const {
      name,
      desc,
      level,
      school,
      castingTime,
      range,
      components,
      duration,
      concentration,
    } = req.body;

    // Validate spell level if provided
    if (level !== undefined && (level < 0 || level > 9)) {
      return res
        .status(400)
        .json({ error: "Spell level must be between 0 and 9" });
    }

    const spell = await prisma.spell.update({
      where: { id: req.params.id },
      data: {
        name,
        desc,
        level,
        school,
        castingTime,
        range,
        components,
        duration,
        concentration,
      },
    });

    res.status(200).json(spell);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Spell not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteSpell = async (req, res) => {
  try {
    await prisma.spell.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Spell deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Spell not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

export { getAllSpells, getSpellById, createSpell, updateSpell, deleteSpell };
