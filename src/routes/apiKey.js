import { Router } from "express";
import issueApiKey from "../middleware/issueApiKey.js";
const router = Router();

/**
 * @swagger
 * /apiKey/issue:
 *   post:
 *     summary: Issue a new API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: API key issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */
router.post("/issue", issueApiKey);

export default router;
