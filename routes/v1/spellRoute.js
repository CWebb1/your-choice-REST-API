import express from "express";
import {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell,
} from "../../controllers/v1/spellController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SpellSchool:
 *       type: string
 *       enum: [ABJURATION, CONJURATION, DIVINATION, ENCHANTMENT, EVOCATION, ILLUSION, NECROMANCY, TRANSMUTATION]
 *       description: The school of magic the spell belongs to
 *
 *     Spell:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - level
 *         - school
 *         - castingTime
 *         - range
 *         - components
 *         - duration
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the spell
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the spell
 *         desc:
 *           type: string
 *           description: Description of the spell and its effects
 *         level:
 *           type: integer
 *           minimum: 0
 *           maximum: 9
 *           description: Spell level (0 for cantrips)
 *         school:
 *           $ref: '#/components/schemas/SpellSchool'
 *         castingTime:
 *           type: string
 *           description: Time required to cast the spell
 *         range:
 *           type: string
 *           description: Range of the spell
 *         components:
 *           type: array
 *           items:
 *             type: string
 *           description: Components required to cast the spell (V, S, M)
 *         duration:
 *           type: string
 *           description: Duration of the spell's effect
 *         concentration:
 *           type: boolean
 *           default: false
 *           description: Whether the spell requires concentration
 *         characterSpells:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CharacterSpell'
 *           description: Characters who have learned this spell
 *           readOnly: true
 *
 * /api/v1/spells:
 *   get:
 *     summary: Retrieve all spells
 *     tags: [Spells]
 *     responses:
 *       200:
 *         description: List of all spells
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Spell'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new spell
 *     tags: [Spells]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *               - level
 *               - school
 *               - castingTime
 *               - range
 *               - components
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               level:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 9
 *               school:
 *                 $ref: '#/components/schemas/SpellSchool'
 *               castingTime:
 *                 type: string
 *               range:
 *                 type: string
 *               components:
 *                 type: array
 *                 items:
 *                   type: string
 *               duration:
 *                 type: string
 *               concentration:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Spell created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spell'
 *       400:
 *         description: Invalid request data
 *
 * /api/v1/spells/{id}:
 *   get:
 *     summary: Get spell by ID
 *     tags: [Spells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Spell UUID
 *     responses:
 *       200:
 *         description: Spell details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spell'
 *       404:
 *         description: Spell not found
 *
 *   put:
 *     summary: Update spell by ID
 *     tags: [Spells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Spell UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Spell'
 *     responses:
 *       200:
 *         description: Spell updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spell'
 *       404:
 *         description: Spell not found
 *       400:
 *         description: Invalid request data
 *
 *   delete:
 *     summary: Delete spell by ID
 *     tags: [Spells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Spell UUID
 *     responses:
 *       200:
 *         description: Spell deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Spell deleted successfully
 *       404:
 *         description: Spell not found
 */

router.get("/", getAllSpells);
router.get("/:id", getSpellById);
router.post("/", createSpell);
router.put("/:id", updateSpell);
router.delete("/:id", deleteSpell);

export default router;
