import express from "express";
import {
  getCharacterSpells,
  learnSpell,
  forgetSpell,
  getSpellsByCharacter
} from "../../controllers/v1/learnedspellController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterSpell:
 *       type: object
 *       required:
 *         - characterId
 *         - spellId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the character-spell relationship
 *           readOnly: true
 *         characterId:
 *           type: string
 *           format: uuid
 *           description: ID of the character learning the spell
 *         spellId:
 *           type: string
 *           format: uuid
 *           description: ID of the spell being learned
 *         spell:
 *           $ref: '#/components/schemas/Spell'
 *           description: The learned spell details
 *           readOnly: true
 *         character:
 *           $ref: '#/components/schemas/Character'
 *           description: The character who learned the spell
 *           readOnly: true
 *
 * /api/v1/character-spells/character/{characterId}:
 *   get:
 *     summary: Get all spells learned by a character
 *     tags: [Character Spells]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *     responses:
 *       200:
 *         description: List of spells learned by the character
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CharacterSpell'
 *       404:
 *         description: Character not found
 *       500:
 *         description: Server error
 *
 * /api/v1/character-spells/learn:
 *   post:
 *     summary: Learn a new spell
 *     tags: [Character Spells]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - characterId
 *               - spellId
 *             properties:
 *               characterId:
 *                 type: string
 *                 format: uuid
 *               spellId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Spell learned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CharacterSpell'
 *       400:
 *         description: Character already knows this spell
 *       404:
 *         description: Character or spell not found
 *
 * /api/v1/character-spells/{characterId}/{spellId}:
 *   delete:
 *     summary: Forget a learned spell
 *     tags: [Character Spells]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *       - in: path
 *         name: spellId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Spell UUID
 *     responses:
 *       200:
 *         description: Spell forgotten successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Spell forgotten successfully
 *       404:
 *         description: Character has not learned this spell
 *
 * /api/v1/character-spells/spells/{characterId}:
 *   get:
 *     summary: Get detailed spell information for a character
 *     tags: [Character Spells]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Character UUID
 *     responses:
 *       200:
 *         description: List of spells with full details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CharacterSpell'
 *       404:
 *         description: Character not found
 */

router.get("/character/:characterId", getCharacterSpells);
router.post("/learn", learnSpell);
router.delete("/:characterId/:spellId", forgetSpell);
router.get("/spells/:characterId", getSpellsByCharacter);

export default router;