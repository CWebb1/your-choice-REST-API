import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getAllWeapons = async (req, res) => {
  try {
    const weapons = await prisma.weapon.findMany();
    res.status(200).json(weapons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWeaponById = async (req, res) => {
  try {
    const weapon = await prisma.weapon.findUnique({
      where: { id: req.params.id },
    });

    if (!weapon) {
      return res.status(404).json({ message: "Weapon not found" });
    }

    res.status(200).json(weapon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWeapon = async (req, res) => {
  try {
    const { name, desc, type, damage, twohanded, versatile, range, architype } =
      req.body;

    // Validate damage dice format (e.g., "1d4", "2d6", "1d12")
    const dicePattern = /^\d+d\d+$/;
    if (!dicePattern.test(damage)) {
      return res
        .status(400)
        .json({
          error: 'Invalid damage format. Use format like "1d6" or "2d8"',
        });
    }

    // Validate range if provided
    if (range !== undefined && range !== null) {
      if (range <= 0) {
        return res
          .status(400)
          .json({ error: "Range must be a positive number" });
      }
    }

    // Validate weapon type logic
    if (type === "RANGED" && range === null) {
      return res
        .status(400)
        .json({ error: "Ranged weapons must have a range value" });
    }

    const weapon = await prisma.weapon.create({
      data: {
        name,
        desc,
        type,
        damage,
        twohanded,
        versatile,
        range,
        architype,
      },
    });

    res.status(201).json(weapon);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Weapon with this name already exists" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const updateWeapon = async (req, res) => {
  try {
    const { name, desc, type, damage, twohanded, versatile, range, architype } =
      req.body;

    // Validate damage dice format if provided
    if (damage) {
      const dicePattern = /^\d+d\d+$/;
      if (!dicePattern.test(damage)) {
        return res
          .status(400)
          .json({
            error: 'Invalid damage format. Use format like "1d6" or "2d8"',
          });
      }
    }

    // Validate range if provided
    if (range !== undefined && range !== null) {
      if (range <= 0) {
        return res
          .status(400)
          .json({ error: "Range must be a positive number" });
      }
    }

    // Validate weapon type logic
    if (type === "RANGED" && range === null) {
      return res
        .status(400)
        .json({ error: "Ranged weapons must have a range value" });
    }

    const weapon = await prisma.weapon.update({
      where: { id: req.params.id },
      data: {
        name,
        desc,
        type,
        damage,
        twohanded,
        versatile,
        range,
        architype,
      },
    });

    res.status(200).json(weapon);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Weapon not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteWeapon = async (req, res) => {
  try {
    await prisma.weapon.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Weapon deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Weapon not found" });
      }
    }
    res.status(400).json({ error: error.message });
  }
};

export {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon,
};
