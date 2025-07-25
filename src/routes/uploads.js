import { Router } from "express";
import uploadToAzure from "../middleware/uploads.js";
const router = Router();

router.post("/stream", uploadToAzure);

export default router;
