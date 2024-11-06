import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        characters: true,
        subclasses: true,
      },
    });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const class_ = await prisma.class.findUnique({
      where: { id: req.params.id },
      include: {
        characters: true,
        subclasses: true,
      },
    });

    if (!class_) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(class_);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const { name, desc, hitDie, primaryAbility, savingThrows, spellcasting } = req.body;

    // Validate required fields
    if (!name || !desc || !hitDie || !primaryAbility || !savingThrows) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate hit die value (typically 6, 8, 10, or 12 in D&D)
    if (![6, 8, 10, 12].includes(hitDie)) {
      return res.status(400).json({ message: 'Invalid hit die value' });
    }

    const class_ = await prisma.class.create({
      data: {
        name,
        desc,
        hitDie,
        primaryAbility,
        savingThrows,
        spellcasting: spellcasting || false,
      },
      include: {
        subclasses: true,
      },
    });

    res.status(201).json(class_);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'A class with this name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, desc, hitDie, primaryAbility, savingThrows, spellcasting } = req.body;

    // Validate hit die value if provided
    if (hitDie && ![6, 8, 10, 12].includes(hitDie)) {
      return res.status(400).json({ message: 'Invalid hit die value' });
    }

    const class_ = await prisma.class.update({
      where: { id: req.params.id },
      data: {
        name,
        desc,
        hitDie,
        primaryAbility,
        savingThrows,
        spellcasting,
      },
      include: {
        subclasses: true,
      },
    });

    res.status(200).json(class_);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Class not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'A class with this name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    // Check if there are any characters using this class
    const charactersUsingClass = await prisma.character.count({
      where: { classId: req.params.id },
    });

    if (charactersUsingClass > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete class while characters are using it',
        charactersCount: charactersUsingClass 
      });
    }

    await prisma.class.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(400).json({ error: error.message });
  }
};

export {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};