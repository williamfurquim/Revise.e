import { prisma } from "../config/prismaClient.js";

export const authRepository = {

    findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                tutorial: true
            }
        });
    },

    create(data) {
        return prisma.user.create({
            data
        });
    },

    updateTutorial(id) {
        return prisma.user.update({
            where: {
                id
            },
            data: {
                tutorial: true
            }
        });
    }
};