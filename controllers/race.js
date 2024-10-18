import { PrismaClient, Prisma } from "@prisma/client";

//creating new instance of PrismaClient

const prisma = new PrismaClient();

// Add this code under const prisma = new PrismaClient();
const createRace = async (req, res) => {
    // Try/catch blocks are used to handle exceptions
    try {
      // Create a new Race
      await prisma.race.create({
        // Data to be inserted
        data: {
            name: req.body.name,
            desc: req.body.desc,
            type: req.body.type,
            playable: req.body.playable
        },
      });
  
      // Get all Races from the Race table
      const newRaces = await prisma.race.findMany();
  
      // Send a JSON response
      return res.status(201).json({
        message: "Race successfully created",
        data: newRaces,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        {
          if (err.code === "P2002") {
            return res.status(409).json({
              message: "Race with the same name already exists",
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


const getRaces = async (req, res) => {
    try {
      const races = await prisma.race.findMany();
  
      // Check if there are no races
      if (!races) {
        return res.status(404).json({ message: "No races found" });
      }
  
      return res.status(200).json({
        data: races,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

// Add this code under the getRaces function
const getRace = async (req, res) => {
    try {
      const race = await prisma.race.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no race
      if (!race) {
        return res
          .status(404)
          .json({
            message: `No race with the id: ${req.params.id} found`,
          });
      }
  
      return res.status(200).json({
        data: race,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

// Add this code under the getRace function
const updateRace = async (req, res) => {
    try {
      // Find the race by id
      let race = await prisma.race.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no race
      if (!race) {
        return res
          .status(404)
          .json({
            message: `No race with the id: ${req.params.id} found`,
          });
      }
  
      // Update the race
      race = await prisma.race.update({
        where: { id: req.params.id },
        data: {
          // Data to be updated
            name: req.body.name,
            desc: req.body.desc,
            type: req.body.type,
            playable: req.body.playable
        },
      });
  
      return res.status(200).json({
        message: `Race with the id: ${req.params.id} successfully updated`,
        data: race,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(409).json({
            message: "Race with the same name already exists",
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
const deleteRace = async (req, res) => {
    try {
      const race = await prisma.race.findUnique({
        where: { id: req.params.id },
      });
  
      if (!race) {
        return res
          .status(404)
          .json({
            message: `No race with the id: ${req.params.id} found`,
          });
      }
  
      await prisma.race.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `Race with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

export {
    createRace,
    getRaces,
    getRace,
    updateRace,
    deleteRace,
}