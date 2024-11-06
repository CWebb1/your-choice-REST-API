import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllRaces = async (req, res) => {
  try {
    const races = await prisma.race.findMany({
      include: {
        characters: true,
      },
    });
    res.status(200).json(races);
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
      return res.status(404).json({ message: 'Race not found' });
    }

    res.status(200).json(race);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRace = async (req, res) => {
  try {
    const { name, desc, playable, speed, darkvision, size } = req.body;

    const race = await prisma.race.create({
      data: {
        name,
        desc,
        playable,
        speed,
        darkvision,
        size,
      },
    });

    res.status(201).json(race);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRace = async (req, res) => {
  try {
    const { name, desc, playable, speed, darkvision, size } = req.body;

    const race = await prisma.race.update({
      where: { id: req.params.id },
      data: {
        name,
        desc,
        playable,
        speed,
        darkvision,
        size,
      },
    });

    res.status(200).json(race);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRace = async (req, res) => {
  try {
    await prisma.race.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: 'Race deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createRace, getAllRaces, getRaceById, updateRace, deleteRace };