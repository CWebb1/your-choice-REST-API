import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const getAllCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany({
      include: {
        race: true,
        class: true,
        subclass: true,
        inventory: true,
        equipment: true,
      },
    });
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const character = await prisma.character.findUnique({
      where: { id: req.params.id },
      include: {
        race: true,
        class: true,
        subclass: true,
        inventory: {
          include: {
            items: true,
            weapon: true,
          },
        },
        equipment: {
          include: {
            weapon: true,
            armor: true,
          },
        },
      },
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCharacter = async (req, res) => {
  try {
    const { name, raceId, classId, subclassId, ...stats } = req.body;

    const character = await prisma.character.create({
      data: {
        name,
        raceId,
        classId,
        subclassId,
        ...stats,
      },
      include: {
        race: true,
        class: true,
        subclass: true,
      },
    });

    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { name, level, experience, ...stats } = req.body;

    const character = await prisma.character.update({
      where: { id: req.params.id },
      data: {
        name,
        level,
        experience,
        ...stats,
      },
      include: {
        race: true,
        class: true,
        subclass: true,
      },
    });

    res.status(200).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    await prisma.character.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {createCharacter, getAllCharacters, getCharacterById, deleteCharacter, updateCharacter};