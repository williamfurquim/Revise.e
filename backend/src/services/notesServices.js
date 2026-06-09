import { notesRepository } from "../repositories/notesRepository.js";
import { AppError } from "../errors/AppError.js";
import { validateId } from "../utils/validators.js";
import { reviewRepository } from "../repositories/reviewRepository.js";
import { extractClozeCards } from "../utils/extractClozeCards.js";

export const notesServices = {

    async find(userId) {
        return notesRepository.find(userId);
    },

    async create(data, userId) {
        const note = await notesRepository.create({
            title: data.title,
            note: data.note,
            userId
        });

        const cards = extractClozeCards(data.note);
        if (cards.length > 0) {
            await reviewRepository.createMany(
                cards.map(card => ({
                    question: card.question,
                    answer: card.answer,
                    noteId: note.id
                }))
            );
        }

        return note;
    },

    async update(id, userId, data) {
        const parsedId = validateId(id);

        if (!parsedId) {
            throw new AppError("ID inválido.", 400);
        }

        const updated = await notesRepository.update(
            parsedId,
            userId,
            data
        );

        if (!updated) {
            throw new AppError("Nota não encontrada.", 404);
        }

        return updated;
    },

    async delete(id, userId) {

        const parsedId = validateId(id);

        if (!parsedId) {
            throw new AppError("ID inválido.", 400);
        }

        const deleted = await notesRepository.delete(
            parsedId,
            userId
        );

        if (!deleted) {
            throw new AppError("Nota não encontrada.", 404 );
        }

        return true;
    }
};