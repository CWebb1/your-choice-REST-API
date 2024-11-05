// controllers/v1/inventoryController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get inventory for a character
export const getCharacterInventory = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: { characterId: req.params.characterId },
      include: {
        items: true,
        weapon: true
      }
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this character' });
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create inventory for a character
export const createInventory = async (req, res) => {
  try {
    const { characterId, gold, weaponlist, itemIds } = req.body;

    // Check if inventory already exists for this character
    const existingInventory = await prisma.inventory.findUnique({
      where: { characterId }
    });

    if (existingInventory) {
      return res.status(400).json({ message: 'Inventory already exists for this character' });
    }

    const inventory = await prisma.inventory.create({
      data: {
        characterId,
        gold,
        weaponlist,
        items: {
          connect: itemIds ? itemIds.map(id => ({ id })) : []
        }
      },
      include: {
        items: true,
        weapon: true
      }
    });

    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update inventory for a character
export const updateInventory = async (req, res) => {
  try {
    const { gold, weaponlist, itemIds } = req.body;

    const inventory = await prisma.inventory.update({
      where: { characterId: req.params.characterId },
      data: {
        gold,
        weaponlist,
        items: {
          set: itemIds ? itemIds.map(id => ({ id })) : []
        }
      },
      include: {
        items: true,
        weapon: true
      }
    });

    res.json(inventory);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Inventory not found for this character' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete inventory for a character
export const deleteInventory = async (req, res) => {
  try {
    await prisma.inventory.delete({
      where: { characterId: req.params.characterId }
    });

    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Inventory not found for this character' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Add item to inventory
export const addItemToInventory = async (req, res) => {
  try {
    const { itemId } = req.body;

    const inventory = await prisma.inventory.update({
      where: { characterId: req.params.characterId },
      data: {
        items: {
          connect: { id: itemId }
        }
      },
      include: {
        items: true,
        weapon: true
      }
    });

    res.json(inventory);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Inventory not found for this character' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Remove item from inventory
export const removeItemFromInventory = async (req, res) => {
  try {
    const { itemId } = req.params;

    const inventory = await prisma.inventory.update({
      where: { characterId: req.params.characterId },
      data: {
        items: {
          disconnect: { id: itemId }
        }
      },
      include: {
        items: true,
        weapon: true
      }
    });

    res.json(inventory);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Inventory or item not found' });
    }
    res.status(500).json({ message: error.message });
  }
};