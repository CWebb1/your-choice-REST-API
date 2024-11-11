import express from "express";
import {
  getAllWeapons,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon
} from "../../controllers/v1/weaponController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WeaponType:
 *       type: string
 *       enum: [FLAIL, MORNINGSTAR, RAPIER, SCHIMITAR, SHORTSWORD, WARPICK, BATTLEAXE, LONGSWORD, TRIDENT, WARHAMMER, GLAIVE, GREATAXE, GREATSWORD, HALBERD, MAUL, PIKE, HANDCROSSBOW, HEAVYCROSSBOW, LONGBOW, CLUB, DAGGER, HANDAXE, JAVELIN, LIGHTHAMMER, MACE, NET, SICKLE, SPEAR, TRIPLE_SPEAR, UNARMED_STRIKE]
 *       description: The type of the weapon
 *
 *     WeaponArchitype:
 *       type: string
 *       enum: [SIMPLE, MARTIAL]
 *       description: The category or complexity level of the weapon
 *
 *     Weapon:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - type
 *         - damage
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID for the weapon
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the weapon
 *         desc:
 *           type: string
 *           description: Description of the weapon
 *         type:
 *           $ref: '#/components/schemas/WeaponType'
 *         damage:
 *           type: string
 *           pattern: ^\d+d\d+$
 *           description: Damage dice notation (e.g., "1d8")
 *         twohanded:
 *           type: boolean
 *           default: false
 *           description: Whether the weapon requires two hands to wield
 *         versatile:
 *           type: boolean
 *           default: true
 *           description: Whether the weapon can be wielded with one or two hands
 *         range:
 *           type: integer
 *           nullable: true
 *           minimum: 1
 *           description: Range in feet (required for ranged weapons)
 *         architype:
 *           $ref: '#/components/schemas/WeaponArchitype'
 *           default: SIMPLE
 *           description: The weapon's category
 *
 * /api/v1/weapons:
 *   get:
 *     summary: Retrieve all weapons
 *     tags: [Weapons]
 *     responses:
 *       200:
 *         description: List of all weapons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new weapon
 *     tags: [Weapons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *               - type
 *               - damage
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               type:
 *                 $ref: '#/components/schemas/WeaponType'
 *               damage:
 *                 type: string
 *                 pattern: ^\d+d\d+$
 *               twohanded:
 *                 type: boolean
 *               versatile:
 *                 type: boolean
 *               range:
 *                 type: integer
 *                 minimum: 1
 *               architype:
 *                 $ref: '#/components/schemas/WeaponArchitype'
 *     responses:
 *       201:
 *         description: Weapon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       400:
 *         description: Invalid request data
 *
 * /api/v1/weapons/{id}:
 *   get:
 *     summary: Get weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Weapon UUID
 *     responses:
 *       200:
 *         description: Weapon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       404:
 *         description: Weapon not found
 *
 *   put:
 *     summary: Update weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Weapon UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weapon'
 *     responses:
 *       200:
 *         description: Weapon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       404:
 *         description: Weapon not found
 *       400:
 *         description: Invalid request data
 *
 *   delete:
 *     summary: Delete weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Weapon UUID
 *     responses:
 *       200:
 *         description: Weapon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weapon deleted successfully
 *       404:
 *         description: Weapon not found
 */

router.get("/", getAllWeapons);
router.get("/:id", getWeaponById);
router.post("/", createWeapon);
router.put("/:id", updateWeapon);
router.delete("/:id", deleteWeapon);

export default router;