import express from "express";
import {
  createRace,
  getAllRaces,
  getRaceById,
  updateRace,
  deleteRace,
} from "../../controllers/v1/raceController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Auto-generated ID for the race.
 *        name:
 *          type: string
 *          example: Human
 *          description: Name of the race.
 *        desc:
 *          type: string
 *          example: These are human beings, we have all seen them before.
 *          description: Description of the race.
 *        playable:
 *          type: boolean
 *          example: true
 *          description: Whether the race is playable or not.
 *        characters:
 *          type: array
 *          format: uuid
 *          description: an array of all characters with this race.
 *        speed:
 *          type: integer
 *          example: 30
 *          description: The default movement speed of the race per turn.
 *        darkvision:
 *          type: boolean
 *          example: false
 *          description: Whether the race has darkvision by default.
 *        size:
 *          type: Size
 *          example: MEDIUM
 *          description: The size classification for the race.
 * 
 * 
 */


  

router.get("/", getAllRaces);
/* 
* @swagger
* /api/v1/races:
*   get:
*     summary: Retrieve all races
*     tags: [Races]
*     responses:
*       200:
*         description: List of all races
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Race'
*       500:
*         description: Server error
*/ 


router.get("/:id", getRaceById);
 /* @swagger
 *  /api/v1/races/{id}:
 *   get:
 *     summary: Get race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Race UUID
 *     responses:
 *       200:
 *         description: Race details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         $ref: '#/components/responses/Race404'
 */


router.post("/", createRace);
/*   post:
*     summary: Create a new race
*     tags: [Races]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Race'
*     responses:
*       201:
*         description: Race created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Race'
*       400:
*         $ref: '#/components/responses/RaceBadRequest'
*/


router.put("/:id", updateRace); //update Race by ID
/*   put:
*     summary: Update race by ID
*     tags: [Races]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*         description: Race UUID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Race'
*     responses:
*       200:
*         description: Race updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Race'
*       404:
*         $ref: '#/components/responses/Race404'
*       400:
*         $ref: '#/components/responses/RaceBadRequest'
*
*/


router.delete("/:id", deleteRace); //delete the Race by ID
/*   delete:
 *     summary: Delete race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Race UUID
 *     responses:
 *       200:
 *         description: Race deleted successfully
 *       404:
 *         $ref: '#/components/responses/Race404'
 */

export default router;
