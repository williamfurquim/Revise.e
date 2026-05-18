import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema) ,login);