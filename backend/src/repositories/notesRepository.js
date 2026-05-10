import { prisma } from "../config/prismaClient.js";

export const notesRepository = {

    find(userId) {

        return prisma.note.findMany({
            where: {
                userId
            },
            orderBy: {
                id: "desc"
            }
        });
    },

    create(data) {

        return prisma.note.create({
            data
        });
    },

    async update(id, userId, data) {

        const result = await prisma.note.updateMany({
            where: {
                id,
                userId
            },
            data
        });

        if (result.count === 0) {
            return null;
        }

        return prisma.note.findUnique({
            where: { id }
        });
    },

    async delete(id, userId) {

        const result = await prisma.note.deleteMany({
            where: {
                id,
                userId
            }
        });

        return result.count > 0;
    }
};