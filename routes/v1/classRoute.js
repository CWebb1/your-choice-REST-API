import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from "../../controllers/v1/classController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subclass:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID for the subclass
 *         name:
 *           type: string
 *           description: Name of the subclass
 *         desc:
 *           type: string
 *           description: Description of the subclass
 *         classId:
 *           type: string
 *           format: uuid
 *           description: ID of the parent class
 *
 *     Class:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - hitDie
 *         - primaryAbility
 *         - savingThrows
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the class
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the class
 *         desc:
 *           type: string
 *           description: Description of the class
 *         hitDie:
 *           type: integer
 *           enum: [6, 8, 10, 12]
 *           description: Hit die value for the class (d6, d8, d10, or d12)
 *         primaryAbility:
 *           type: string
 *           enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *           description: Primary ability score for the class
 *         savingThrows:
 *           type: array
 *           items:
 *             type: string
 *             enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *           description: Saving throw proficiencies for the class
 *         spellcasting:
 *           type: boolean
 *           default: false
 *           description: Whether the class can cast spells
 *         subclasses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subclass'
 *           description: List of subclasses available to this class
 *
 *   responses:
 *     Class404:
 *       description: Class not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Class not found
 *     ClassBadRequest:
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
 * /api/v1/classes:
 *   get:
 *     summary: Retrieve all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of all classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *               - hitDie
 *               - primaryAbility
 *               - savingThrows
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               hitDie:
 *                 type: integer
 *                 enum: [6, 8, 10, 12]
 *               primaryAbility:
 *                 type: string
 *                 enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *               savingThrows:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *               spellcasting:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         $ref: '#/components/responses/ClassBadRequest'
 *
 * /api/v1/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Class UUID
 *     responses:
 *       200:
 *         description: Class details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         $ref: '#/components/responses/Class404'
 *
 *   put:
 *     summary: Update class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Class UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               hitDie:
 *                 type: integer
 *                 enum: [6, 8, 10, 12]
 *               primaryAbility:
 *                 type: string
 *                 enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *               savingThrows:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA]
 *               spellcasting:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         $ref: '#/components/responses/Class404'
 *       400:
 *         $ref: '#/components/responses/ClassBadRequest'
 *
 *   delete:
 *     summary: Delete class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Class UUID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Class deleted successfully
 *       400:
 *         description: Cannot delete class while characters are using it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot delete class while characters are using it
 *                 charactersCount:
 *                   type: integer
 *                   example: 3
 *       404:
 *         $ref: '#/components/responses/Class404'
 */

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
