import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get a race
const createRace = async (req, res) => {
  try{
    //create a race
    await prisma.race.create({
        //stored data
        data:{
            name: req.body.name,
            desc: req.body.desc,
            playable: req.body.playable,
            characters: req.body.characters,
            speed: req.body.speed,
            darkvision: req.body.darkvision,
            size: req.body.size,
        }
    });

    const newRaces = await prisma.race.findMany();

    return res.status(201).json({
        message: "Race successfully created",
        data: newRaces
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

// Add this code under the createInstitution function
const getAllRaces = async (req, res) => {
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

  // Add this code under the getInstitutions function
const getRaceById = async (req, res) => {
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

  // Add this code under the getInstitution function
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
        data:{
            name: req.body.name,
            desc: req.body.desc,
            playable: req.body.playable,
            characters: req.body.characters,
            speed: req.body.speed,
            darkvision: req.body.darkvision,
            size: req.body.size,
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

  export{
    createRace,
    getAllRaces,
    getRaceById,
    updateRace,
    deleteRace,
  }