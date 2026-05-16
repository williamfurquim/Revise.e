import { prisma } from "../config/prismaClient.js";

export const reviewRepository = {

    createMany(data) {

        return prisma.reviewCard.createMany({
            data
        });
    },

    findDueCards(userId) {

        return prisma.reviewCard.findMany({

            where: {

                nextReview: {
                    lte: new Date()
                },

                note: {
                    userId
                }
            },

            orderBy: {
                nextReview: "asc"
            }
        });
    },

    findCardsByNote(noteId, userId) {
        return prisma.reviewCard.findMany({
            where: {

                noteId,

                note: {
                    userId
                }
            },

            orderBy: {
                createdAt: "asc"
            }
        })
    },

    updateReviewCount(noteId, userId) {
        return prisma.note.updateMany({
            where: { 
                id: noteId, 
                userId
            },
            data: {
                reviewCount: {
                    increment: 1
                }
            }
        });
    }
};