import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getDueCards, getCardsByNote, incrementReviewCount } from "../controllers/reviewController.js";

export const reviewRouter = Router();

reviewRouter.get(
    "/review/due",
    authMiddleware,
    getDueCards
);

reviewRouter.get(
    '/review/:noteId', 
    authMiddleware, 
    getCardsByNote
);

reviewRouter.patch(
    '/review/:noteId/review-count',
    authMiddleware,
    incrementReviewCount
);