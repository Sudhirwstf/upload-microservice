import { Router } from "express";
import issueApiKey from "../middleware/issueApiKey.js";
const router = Router();

router.post("/issue", issueApiKey);

export default router;
