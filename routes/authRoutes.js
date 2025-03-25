import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/authController.js";
import validate from "../middleware/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/check", authMiddleware, checkAuth); 

export default router;
