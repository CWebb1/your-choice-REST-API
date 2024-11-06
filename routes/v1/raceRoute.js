import express from "express";
import {
  createRace,
  getAllRaces,
  getRaceById,
  updateRace,
  deleteRace,
} from "../../controllers/v1/raceController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the race
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the race
 *         desc:
 *           type: string
 *           description: Description of the race
 *         playable:
 *           type: boolean
 *           default: true
 *           description: Whether the race is playable by players
 *         speed:
 *           type: integer
 *           default: 30
 *           description: Base walking speed in feet
 *         darkvision:
 *           type: boolean
 *           default: false
 *           description: Whether the race has darkvision
 *         size:
 *           type: string
 *           enum: [TINY, SMALL, MEDIUM, LARGE, HUGE, GARGANTUAN]
 *           default: MEDIUM
 *           description: Size category of the race
 *   
 *   responses:
 *     Race404:
 *       description: Race not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Race not found
 * 
 * @swagger
 * /api/v1/races:
 *   get:
 *     summary: Retrieve all races
 *     tags: [Races]
 *     responses:
 *       200:
 *         description: List of all races
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 *       500:
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new race
 *     tags: [Races]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       201:
 *         description: Race created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       400:
 *         description: Invalid request data
 * 
 * /api/v1/races/{id}:
 *   get:
 *     summary: Get race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Race UUID
 *     responses:
 *       200:
 *         description: Race details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         $ref: '#/components/responses/Race404'
 * 
 *   put:
 *     summary: Update race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Race UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: Race updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         $ref: '#/components/responses/Race404'
 * 
 *   delete:
 *     summary: Delete race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Race UUID
 *     responses:
 *       200:
 *         description: Race deleted successfully
 *       404:
 *         $ref: '#/components/responses/Race404'
 */

router.get("/", getAllRaces);
router.get("/:id", getRaceById);
router.post("/", createRace);
router.put("/:id", updateRace);
router.delete("/:id", deleteRace);

export default router;