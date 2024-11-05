// routes/v1/inventoryRoute.js
import express from 'express';
import {
  getCharacterInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  addItemToInventory,
  removeItemFromInventory
} from '../../controllers/v1/inventoryController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory:
 *   get:
 *     summary: Get character's inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Character's inventory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */
router.get('/characters/:characterId/inventory', getCharacterInventory);

/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory:
 *   post:
 *     summary: Create inventory for character
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gold:
 *                 type: integer
 *                 default: 0
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 default: 20
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/characters/:characterId/inventory', createInventory);

/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory:
 *   put:
 *     summary: Update character's inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       404:
 *         description: Inventory not found
 */
router.put('/characters/:characterId/inventory', updateInventory);

/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory:
 *   delete:
 *     summary: Delete character's inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory not found
 */
router.delete('/characters/:characterId/inventory', deleteInventory);

/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory/items:
 *   post:
 *     summary: Add item to inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       200:
 *         description: Item added successfully
 *       404:
 *         description: Character inventory not found
 *       400:
 *         description: Invalid request data or inventory full
 */
router.post('/characters/:characterId/inventory/items', addItemToInventory);


/**
 * @swagger
 * /api/v1/characters/{characterId}/inventory/items/{itemId}:
 *   delete:
 *     summary: Remove item from inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Character ID
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Character inventory or item not found
 */
router.delete('/characters/:characterId/inventory/items/:itemId', removeItemFromInventory);

export default router;