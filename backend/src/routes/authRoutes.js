import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { finishTutorial } from "../controllers/authController.js";
export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema) ,login);
authRouter.patch("/tutorial", authMiddleware, finishTutorial)