import { notesRepository } from "../repositories/notesRepository.js";

import { AppError } from "../errors/AppError.js";

import { validateId } from "../utils/validators.js";

export const notesServices = {

    async find(userId) {

        return notesRepository.find(userId);
    },

    async create(data, userId) {

        return notesRepository.create({
            title: data.title,
            note: data.note,
            userId
        });
    },

    async update(id, userId, data) {

        const parsedId = validateId(id);

        if (!parsedId) {

            throw new AppError(
                "ID inválido.",
                400
            );
        }

        const updated =
            await notesRepository.update(
                parsedId,
                userId,
                data
            );

        if (!updated) {

            throw new AppError(
                "Nota não encontrada.",
                404
            );
        }

        return updated;
    },

    async delete(id, userId) {

        const parsedId = validateId(id);

        if (!parsedId) {

            throw new AppError(
                "ID inválido.",
                400
            );
        }

        const deleted =
            await notesRepository.delete(
                parsedId,
                userId
            );

        if (!deleted) {

            throw new AppError(
                "Nota não encontrada.",
                404
            );
        }

        return true;
    }
};