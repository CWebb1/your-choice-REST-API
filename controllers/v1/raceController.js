import { PrismaClient } from "@prisma/client";
import { buildPrismaQuery } from "../../utils/queryHelper.js";
import joi from "joi";

const prisma = new PrismaClient();

// Validation schema
const raceSchema = joi.object({
  name: joi.string().required(),
  desc: joi.string().required(),
  playable: joi.boolean(),
  speed: joi.number().integer().min(0).max(100),
  darkvision: joi.boolean(),
  size: joi
    .string()
    .valid("TINY", "SMALL", "MEDIUM", "LARGE", "HUGE", "GARGANTUAN"),
});

const getAllRaces = async (req, res) => {
  try {
    const query = buildPrismaQuery(req.query);
    const [races, total] = await Promise.all([
      prisma.race.findMany({
        ...query,
        include: {
          characters: true,
        },
      }),
      prisma.race.count({ where: query.where }),
    ]);

    res.status(200).json({
      data: races,
      meta: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 25,
        totalPages: Math.ceil(total / (parseInt(req.query.limit) || 25)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRaceById = async (req, res) => {
  try {
    const race = await prisma.race.findUnique({
      where: { id: req.params.id },
      include: {
        characters: true,
      },
    });

    if (!race) {
      return res.status(404).json({ message: "Race not found" });
    }

    res.status(200).json(race);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRace = async (req, res) => {
  try {
    // Validate request body
    const { error } = raceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const race = await prisma.race.create({
      data: req.body,
    });

    res.status(201).json(race);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRace = async (req, res) => {
  try {
    // Validate request body
    const { error } = raceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const race = await prisma.race.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        characters: true,
      },
    });

    res.status(200).json(race);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Race not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteRace = async (req, res) => {
  try {
    await prisma.race.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Race deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Race not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

export { createRace, getAllRaces, getRaceById, updateRace, deleteRace };
