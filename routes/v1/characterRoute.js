import express from 'express';
import {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from '../../controllers/v1/characterController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EquipmentSlot:
 *       type: object
 *       required:
 *         - slotType
 *         - itemId
 *       properties:
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
 *     InventoryItem:
 *       type: object
 *       required:
 *         - itemId
 *         - quantity
 *       properties:
 *         itemId:
 *           type: string
 *           format: uuid
 *           description: ID of the item
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Number of items in stack
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
 *             $ref: '#/components/schemas/InventoryItem'
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
 *         - learnedSpells
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
 *         learnedSpells:
 *           type: string
 *           format: uuid
 *           description: ID of spells the character has learned
 *         inventoryId:
 *           type: string
 *           format: uuid
 *           description: ID reference to the character's inventory
 *         equipmentId:
 *           type: string
 *           format: uuid
 *           description: ID reference to the character's equipment
 *
 * 
 *   responses:
 *     Character404:
 *       description: Character not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Character not found
 *     CharacterBadRequest:
 *       description: Invalid request data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid request data
 * 
 * @swagger
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
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       201:
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/CharacterBadRequest'
 * 
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
 *         description: Character details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         $ref: '#/components/responses/Character404'
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
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: Character updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         $ref: '#/components/responses/Character404'
 *       400:
 *         $ref: '#/components/responses/CharacterBadRequest'
 * 
 *   delete:
 *     summary: Delete character by ID
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
 *         description: Character deleted successfully
 *       404:
 *         $ref: '#/components/responses/Character404'
 */
// Character routes
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

export default router;