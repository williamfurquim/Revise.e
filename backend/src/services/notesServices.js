import { notesRepository } from "../repositories/notesRepository.js";
import { AppError } from "../errors/AppError.js";

import {
    validateString,
    validateId
} from "../utils/validators.js";

export const notesServices = {

    async find(userId) {
        return notesRepository.find(userId);
    },

    async create(data, userId) {

        if (!data || typeof data !== "object") {
            throw new AppError(
                "Dados inválidos.",
                400
            );
        }

        const titleError = validateString(
            data.title,
            "Título",
            3,
            120
        );

        const noteError = validateString(
            data.note,
            "Nota",
            1,
            5000
        );

        if (titleError || noteError) {

            throw new AppError(
                titleError || noteError,
                400
            );
        }

        const title = data.title.trim();
        const note = data.note.trim();

        return notesRepository.create({
            title,
            note,
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

        if (!data || typeof data !== "object") {
            throw new AppError(
                "Dados inválidos.",
                400
            );
        }

        const titleError = validateString(
            data.title,
            "Título",
            3,
            120
        );

        const noteError = validateString(
            data.note,
            "Nota",
            1,
            5000
        );

        if (titleError || noteError) {

            throw new AppError(
                titleError || noteError,
                400
            );
        }

        const title = data.title.trim();
        const note = data.note.trim();

        const updated = await notesRepository.update(
            parsedId,
            userId,
            {
                title,
                note
            }
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

        const deleted = await notesRepository.delete(
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