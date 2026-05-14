import { reviewRepository } from "../repositories/reviewRepository.js";

export const reviewServices = {

    async getDueCards(userId) {

        return reviewRepository.findDueCards(userId);
    }
};