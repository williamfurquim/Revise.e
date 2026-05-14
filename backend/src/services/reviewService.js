import { reviewRepository } from "../repositories/reviewRepository.js";

export const reviewServices = {

    async getDueCards(userId) {

        return reviewRepository.findDueCards(userId);
    },

    async getCardsByNote(noteId, userId){
        return reviewRepository.findCardsByNote(
            noteId,
            userId
        )
    }
}