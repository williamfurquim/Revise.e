import { asyncHandler } from "../middlewares/asyncHandler.js";
import { reviewServices } from "../services/reviewService.js";

export const getDueCards = asyncHandler(

    async (req, res) => {

        const cards =
            await reviewServices.getDueCards(
                req.userId
            );

        res.json(cards);
    }
);