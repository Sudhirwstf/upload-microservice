// import { Router } from "express";
// const router = Router();

// router.get("/", (req, res) => {
//   res.status(200).json({ message: "I'm alive!" });
// });

// export default router;

import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: I'm alive!
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "I'm alive!" });
});

export default router;
