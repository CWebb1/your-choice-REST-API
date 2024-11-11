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
            items: true
          },
        },
        equipment: {
          include: {
            slots: {
              include: {
                item: true
              }
            }
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
    
    // Validate ability scores
    const abilityScores = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    for (const score of abilityScores) {
      if (stats[score] && (stats[score] < 1 || stats[score] > 20)) {
        return res.status(400).json({ error: `${score} must be between 1 and 20` });
      }
    }

    const character = await prisma.character.create({
      data: {
        name,
        raceId,
        classId,
        subclassId,
        ...stats,
        inventory: {
          create: {
            gold: 0,
            capacity: 20
          }
        },
        equipment: {
          create: {
            slots: {
              create: []
            }
          }
        }
      },
      include: {
        race: true,
        class: true,
        subclass: true,
        inventory: true,
        equipment: true
      }
    });

    res.status(201).json(character);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Character with this name already exists' });
      } else if (error.code === 'P2003') {
        return res.status(400).json({ error: 'Invalid reference ID provided' });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { name, level, experience, ...stats } = req.body;

    // Validate ability scores
    const abilityScores = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    for (const score of abilityScores) {
      if (stats[score] && (stats[score] < 1 || stats[score] > 20)) {
        return res.status(400).json({ error: `${score} must be between 1 and 20` });
      }
    }

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
    // With cascade delete in schema, this will automatically delete inventory and equipment
    await prisma.character.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: 'Character and all associated data deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export {createCharacter, getAllCharacters, getCharacterById, deleteCharacter, updateCharacter};