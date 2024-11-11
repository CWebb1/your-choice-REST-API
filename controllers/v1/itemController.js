import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: {
        inventory: true,
        equipmentSlot: true,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.id },
      include: {
        inventory: true,
        equipmentSlot: true,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, desc, quantity, inventoryId } = req.body;

    // Validate quantity
    if (quantity && quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const item = await prisma.item.create({
      data: {
        name,
        desc,
        quantity,
        inventory: {
          connect: {
            id: inventoryId,
          },
        },
      },
      include: {
        inventory: true,
        equipmentSlot: true,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return res.status(400).json({ error: "Invalid inventory ID provided" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { name, desc, quantity } = req.body;

    // Validate quantity if provided
    if (quantity && quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const item = await prisma.item.update({
      where: { id: req.params.id },
      data: {
        name,
        desc,
        quantity,
      },
      include: {
        inventory: true,
        equipmentSlot: true,
      },
    });

    res.status(200).json(item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Item not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    await prisma.item.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Item not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

export { createItem, getAllItems, getItemById, updateItem, deleteItem };
