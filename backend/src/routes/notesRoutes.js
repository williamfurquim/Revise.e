import { deleteNote, addNote, getNotes, putNote } from "../controllers/notesController.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createNoteSchema, updateNoteSchema } from "../schemas/notesSchema.js";

export const notesRouter = Router();

notesRouter.get('/notes', authMiddleware, getNotes);
notesRouter.post('/notes', authMiddleware, validate(createNoteSchema) ,addNote);
notesRouter.put('/notes/:id', authMiddleware, validate(updateNoteSchema) ,putNote);
notesRouter.delete('/notes/:id', authMiddleware, deleteNote);