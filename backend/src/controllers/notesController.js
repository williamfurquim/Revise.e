import { notesServices } from "../services/notesServices.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const getNotes = asyncHandler(async (req, res) => {

    const allNotes = await notesServices.find(req.userId);

    res.json(allNotes);
});

export const addNote = asyncHandler(async (req, res) => {

    const newNote = await notesServices.create(
        req.body,
        req.userId
    );

    res.status(201).json(newNote);
});

export const putNote = asyncHandler(async (req, res) => {

    const note = await notesServices.update(
        req.params.id,
        req.userId,
        req.body
    );

    res.status(200).json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {

    await notesServices.delete(
        req.params.id,
        req.userId
    );

    res.status(204).send();
});