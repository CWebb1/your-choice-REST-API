// routes/v1/equipmentRoute.js
import express from "express";
import {
  getCharacterEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../../controllers/v1/equipmentController.js";
const router = express.Router();

/**
 * @swagger
 * /api/v1/characters/{characterId}/equipment:
 *   get:
 *     summary: Get character's equipment
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Character's equipment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 */
router.get("/characters/:characterId/equipment", getCharacterEquipment);

/**
 * @swagger
 * /api/v1/characters/{characterId}/equipment:
 *   post:
 *     summary: Create equipment set for character
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slots:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EquipmentSlot'
 *                 description: List of equipment slots with their equipped items
 *     responses:
 *       201:
 *         description: Equipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: Invalid request data
 */
router.post("/characters/:characterId/equipment", createEquipment);

/**
 * @swagger
 * /api/v1/characters/{characterId}/equipment:
 *   put:
 *     summary: Update character's equipment
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Equipment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 */
router.put("/characters/:characterId/equipment", updateEquipment);

/**
 * @swagger
 * /api/v1/characters/{characterId}/equipment:
 *   delete:
 *     summary: Delete character's equipment
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Equipment deleted successfully
 *       404:
 *         description: Equipment not found
 */
router.delete("/characters/:characterId/equipment", deleteEquipment);

export default router;
