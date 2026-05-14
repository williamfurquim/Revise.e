import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { getDueCards } from "../controllers/reviewController.js";

export const reviewRouter = Router();

reviewRouter.get(
    "/review/due",
    authMiddleware,
    getDueCards
);