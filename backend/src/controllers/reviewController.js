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

export const getCardsByNote = asyncHandler(

    async (req, res) => {
        const noteId = Number(req.params.noteId)

        const cards =
        await reviewServices.getCardsByNote(
            noteId,
            req.userId
        );

        res.json(cards);
    }
)