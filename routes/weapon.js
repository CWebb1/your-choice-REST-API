import express from "express";

import {
  createWeapon,
  getWeapon,
  getWeapons,
  updateWeapon,
  deleteWeapon,
} from "../controllers/weapon.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WeaponType:
 *       type: string
 *       enum: [FLAIL, MORNINGSTAR, RAPIER, SCHIMITAR, SHORTSWORD, WARPICK, BATTLEAXE, 
 *              LONGSWORD, TRIDENT, WARHAMMER, GLAIVE, GREATAXE, GREATSWORD, HALBERD, 
 *              MAUL, PIKE, HANDCROSSBOW, HEAVYCROSSBOW, LONGBOW, CLUB, DAGGER, HANDAXE, 
 *              JAVELIN, LIGHTHAMMER, MACE, SICKLE, QUARTERSTAFF, SPEAR, GREATCLUB, 
 *              LIGHTCROSSBOW, SHORTBOW]
 *     WeaponArchitype:
 *       type: string
 *       enum: [MARTIAL, SIMPLE]
 *     Weapon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *         desc:
 *           type: string
 *         enchantment:
 *           type: integer
 *           nullable: true
 *         type:
 *           $ref: '#/components/schemas/WeaponType'
 *           default: DAGGER
 *         architype:
 *           $ref: '#/components/schemas/WeaponArchitype'
 *           default: SIMPLE
 *         twohanded:
 *           type: boolean
 *           default: false
 *         versatile:
 *           type: boolean
 *           default: true
 *         range:
 *           type: integer
 *     WeaponInput:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - range
 *       properties:
 *         name:
 *           type: string
 *         desc:
 *           type: string
 *         enchantment:
 *           type: integer
 *           nullable: true
 *         type:
 *           $ref: '#/components/schemas/WeaponType'
 *         architype:
 *           $ref: '#/components/schemas/WeaponArchitype'
 *         twohanded:
 *           type: boolean
 *         versatile:
 *           type: boolean
 *         range:
 *           type: integer
 * 
 * /api/weapons:
 *   get:
 *     tags: [Weapons]
 *     summary: Returns all weapons
 *     responses:
 *       200:
 *         description: List of weapons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Server error
 *   
 *   post:
 *     tags: [Weapons]
 *     summary: Create a new weapon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WeaponInput'
 *     responses:
 *       201:
 *         description: Weapon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Server error
 * 
 * /api/weapons/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: Weapon ID
 *   
 *   get:
 *     tags: [Weapons]
 *     summary: Get a weapon by ID
 *     responses:
 *       200:
 *         description: Weapon details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Weapon'
 *       404:
 *         description: Weapon not found
 *       500:
 *         description: Server error
 *   
 *   put:
 *     tags: [Weapons]
 *     summary: Update a weapon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WeaponInput'
 *     responses:
 *       200:
 *         description: Weapon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Weapon'
 *       404:
 *         description: Weapon not found
 *       500:
 *         description: Server error
 *   
 *   delete:
 *     tags: [Weapons]
 *     summary: Delete a weapon
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
 *       404:
 *         description: Weapon not found
 *       500:
 *         description: Server error
 */
router.post("/", createWeapon);


router.get("/", getWeapons);


router.get("/:id", getWeapon);


router.put("/:id", updateWeapon);


router.delete("/:id", deleteWeapon);

export default router;
