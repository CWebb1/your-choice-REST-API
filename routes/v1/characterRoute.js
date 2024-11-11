import express from "express";
import {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from "../../controllers/v1/characterController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterSpell:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID for the character spell relation
 *         characterId:
 *           type: string
 *           format: uuid
 *           description: ID of the character who learned the spell
 *         spellId:
 *           type: string
 *           format: uuid
 *           description: ID of the learned spell
 *
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID for the item
 *         name:
 *           type: string
 *           description: Name of the item
 *         desc:
 *           type: string
 *           description: Description of the item
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           description: Number of items in stack
 *
 *     EquipmentSlot:
 *       type: object
 *       required:
 *         - slotType
 *         - itemId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID for the equipment slot
 *         slotType:
 *           type: string
 *           enum: [HEAD, NECK, SHOULDERS, CHEST, BACK, ARMS, HANDS, WAIST, LEGS, FEET, MAIN_HAND, OFF_HAND, TWO_HAND, RING_1, RING_2]
 *           description: Type of equipment slot
 *         itemId:
 *           type: string
 *           format: uuid
 *           description: ID of the equipped item
 *
 *     Equipment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Equipment set ID
 *         characterId:
 *           type: string
 *           format: uuid
 *           description: ID of character this equipment belongs to
 *         slots:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EquipmentSlot'
 *           description: List of equipped items in their slots
 *
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Inventory ID
 *         characterId:
 *           type: string
 *           format: uuid
 *           description: ID of character this inventory belongs to
 *         gold:
 *           type: integer
 *           default: 0
 *           description: Amount of gold the character has
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *           description: List of items in inventory
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *           description: Maximum number of different item stacks
 *
 *     Character:
 *       type: object
 *       required:
 *         - name
 *         - raceId
 *         - classId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the character
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Character's name
 *         level:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 1
 *           description: Character's current level
 *         experience:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           description: Character's current experience points
 *         raceId:
 *           type: string
 *           format: uuid
 *           description: ID of the character's race
 *         classId:
 *           type: string
 *           format: uuid
 *           description: ID of the character's class
 *         subclassId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Optional ID of the character's subclass
 *         strength:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's strength score
 *         dexterity:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's dexterity score
 *         constitution:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's constitution score
 *         intelligence:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's intelligence score
 *         wisdom:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's wisdom score
 *         charisma:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 10
 *           description: Character's charisma score
 *         inventory:
 *           $ref: '#/components/schemas/Inventory'
 *           description: Character's inventory (automatically created)
 *           readOnly: true
 *         equipment:
 *           $ref: '#/components/schemas/Equipment'
 *           description: Character's equipment loadout (automatically created)
 *           readOnly: true
 *         learnedSpells:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CharacterSpell'
 *           description: List of spells the character has learned
 *
 * /api/v1/characters:
 *   get:
 *     summary: Retrieve all characters
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: List of all characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new character
 *     description: Creates a new character with automatic inventory and equipment initialization
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - raceId
 *               - classId
 *             properties:
 *               name:
 *                 type: string
 *               raceId:
 *                 type: string
 *                 format: uuid
 *               classId:
 *                 type: string
 *                 format: uuid
 *               subclassId:
 *                 type: string
 *                 format: uuid
 *               strength:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               dexterity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               constitution:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               intelligence:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               wisdom:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               charisma:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *     responses:
 *       201:
 *         description: Character created successfully with initialized inventory and equipment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Invalid request data or reference IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid race ID
 *
 * /api/v1/characters/{id}:
 *   delete:
 *     summary: Delete character by ID
 *     description: Deletes a character and automatically removes their inventory and equipment
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *     responses:
 *       200:
 *         description: Character and all associated data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Character and all associated data deleted successfully
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Character not found
 */
/**
 * @swagger
 * /api/v1/characters/{id}:
 *   get:
 *     summary: Get character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *     responses:
 *       200:
 *         description: Character details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Character not found
 *
 *   put:
 *     summary: Update character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               experience:
 *                 type: integer
 *                 minimum: 0
 *               subclassId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               strength:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               dexterity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               constitution:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               intelligence:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               wisdom:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *               charisma:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *     responses:
 *       200:
 *         description: Character updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ability score value
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Character not found
 */

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
