import express from "express";

import {
  createRace,
  getRaces,
  getRace,
  updateRace,
  deleteRace,
} from "../controllers/race.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Human"
 *         desc:
 *           type: string
 *           example: "The most common face in Faerûn, humans are known for their tenacity, creativity, and endless capacity for growth"
 *         type:
 *           type: raceType
 *           example: "HUMAN"
 *         playable:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 */

/**
 * @swagger
 * /api/races:
 *   post:
 *     summary: Create a new race
 *     tags:
 *       - Race
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       '201':
 *         description: Race successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Race successfully created"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Race'
 *       '400':
 *         description: Race with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Race with the same name already exists"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/", createRace);

/**
 * @swagger
 * /api/races:
 *   get:
 *     summary: Get all races
 *     tags:
 *       - Race
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Race'
 *       '404':
 *         description: No races found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No races found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/", getRaces);

/**
 * @swagger
 * /api/races/{id}:
 *   get:
 *     summary: Get a race by id
 *     tags:
 *       - Race
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The race id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       '404':
 *         description: No race found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No race with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/:id", getRace);

/**
 * @swagger
 * /api/races/{id}:
 *   put:
 *     summary: Update an race by id
 *     tags:
 *       - Race
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The race id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       '200':
 *         description: Race successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Race with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Race'
 *       '404':
 *         description: No race found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No race with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put("/:id", updateRace);

/**
 * @swagger
 * /api/races/{id}:
 *   delete:
 *     summary: Delete an race by id
 *     tags:
 *       - Race
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The race id
 *     responses:
 *       '200':
 *         description: Race successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Race with the id: {id} successfully deleted"
 *       '404':
 *         description: No race found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No race with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.delete("/:id", deleteRace);

export default router;
