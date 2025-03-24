import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:userId", authMiddleware, getMessages);

export default router;
