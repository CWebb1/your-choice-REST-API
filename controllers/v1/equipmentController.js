// controllers/v1/equipmentController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get equipment for a character
export const getCharacterEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { characterId: req.params.characterId },
      include: {
        weapon: true,
        armor: true
      }
    });

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found for this character' });
    }

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create equipment for a character
export const createEquipment = async (req, res) => {
  try {
    const { characterId, equipedWeapon, armorId } = req.body;

    // Check if equipment already exists for this character
    const existingEquipment = await prisma.equipment.findUnique({
      where: { characterId }
    });

    if (existingEquipment) {
      return res.status(400).json({ message: 'Equipment already exists for this character' });
    }

    const equipment = await prisma.equipment.create({
      data: {
        characterId,
        equipedWeapon,
        armor: armorId ? { connect: { id: armorId } } : undefined
      },
      include: {
        weapon: true,
        armor: true
      }
    });

    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update equipment for a character
export const updateEquipment = async (req, res) => {
  try {
    const { equipedWeapon, armorId } = req.body;

    const equipment = await prisma.equipment.update({
      where: { characterId: req.params.characterId },
      data: {
        equipedWeapon,
        armor: armorId ? { connect: { id: armorId } } : { disconnect: true }
      },
      include: {
        weapon: true,
        armor: true
      }
    });

    res.json(equipment);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Equipment not found for this character' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete equipment for a character
export const deleteEquipment = async (req, res) => {
  try {
    await prisma.equipment.delete({
      where: { characterId: req.params.characterId }
    });

    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Equipment not found for this character' });
    }
    res.status(500).json({ message: error.message });
  }
};