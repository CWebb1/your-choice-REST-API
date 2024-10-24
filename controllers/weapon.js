import { PrismaClient, Prisma } from "@prisma/client";

//creating new instance of PrismaClient

const prisma = new PrismaClient();

// Add this code under const prisma = new PrismaClient();
const createWeapon = async (req, res) => {
    // Try/catch blocks are used to handle exceptions
    try {
      // Create a new Weapon
      await prisma.weapon.create({
        // Data to be inserted
        data: {
            name: req.body.name,
            desc: req.body.desc,
            enchantment: req.body.enchantment,
            type: req.body.type,
            architype: req.body.architype,
            twoHanded: req.body.twoHanded,
            versatile: req.body.versatile,
            type: req.body.type,
            range: req.body.range,
        },
      });
  
      // Get all Weapons from the Weapon table
      const newWeapon = await prisma.weapon.findMany();
  
      // Send a JSON response
      return res.status(201).json({
        message: "Weapon successfully created",
        data: newWeapon,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        {
          if (err.code === "P2002") {
            return res.status(409).json({
              message: "Weapon with the same name already exists",
            });
          }
        }
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    }
};


const getWeapons = async (req, res) => {
    try {
      const weapons = await prisma.weapon.findMany();
  
      // Check if there are no weapons
      if (!weapons) {
        return res.status(404).json({ message: "No weapons found" });
      }
  
      return res.status(200).json({
        data: weapons,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

// Add this code under the getWeapon function
const getWeapon = async (req, res) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no weapon
      if (!weapon) {
        return res
          .status(404)
          .json({
            message: `No weapon with the id: ${req.params.id} found`,
          });
      }
  
      return res.status(200).json({
        data: weapon,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

// Add this code under the getRace function
const updateWeapon = async (req, res) => {
    try {
      // Find the weapon by id
      let weapon = await prisma.weapon.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no weapon
      if (!weapon) {
        return res
          .status(404)
          .json({
            message: `No weapon with the id: ${req.params.id} found`,
          });
      }
  
      // Update the weapon
      weapon = await prisma.weapon.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          desc: req.body.desc,
          enchantment: req.body.enchantment,
          type: req.body.type,
          architype: req.body.architype,
          twoHanded: req.body.twoHanded,
          versatile: req.body.versatile,
          type: req.body.type,
          range: req.body.range,
        },
      });
  
      return res.status(200).json({
        message: `Weapon with the id: ${req.params.id} successfully updated`,
        data: weapon,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(409).json({
            message: "Weapon with the same name already exists",
          });
        }
      } else {
        return res.status(500).json({
          message: err.message,
        });
      }
    }
};

// Add this code under the updateInstitution function
const deleteWeapon = async (req, res) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: { id: req.params.id },
      });
  
      if (!weapon) {
        return res
          .status(404)
          .json({
            message: `No weapon with the id: ${req.params.id} found`,
          });
      }
  
      await prisma.weapon.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `weapon with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

export {
    createWeapon,
    getWeapons,
    getWeapon,
    updateWeapon,
    deleteWeapon,
}