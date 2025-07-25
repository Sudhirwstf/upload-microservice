// import { Router } from "express";
// import uploadToAzure from "../middleware/uploads.js";
// const router = Router();

// router.post("/stream", uploadToAzure);

// export default router;

import { Router } from "express";
import uploadToAzure from "../middleware/uploads.js";
const router = Router();

/**
 * @swagger
 * /upload/stream:
 *   post:
 *     summary: Upload a file stream to Azure Blob Storage
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: x-filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the file being uploaded
 *     requestBody:
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             type: string
 *             format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 *                 etag:
 *                   type: string
 *                 lastModified:
 *                   type: string
 *                 requestId:
 *                   type: string
 *       400:
 *         description: x-filename header is required
 *       500:
 *         description: Upload failed
 */
router.post("/stream", uploadToAzure);

export default router;
