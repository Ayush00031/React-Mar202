import { Router } from "express";
import {
  registerUser,
  loginUser,
  getContacts,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/contacts", protect, getContacts);

export default router;
