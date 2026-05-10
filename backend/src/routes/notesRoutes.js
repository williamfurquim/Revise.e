import { deleteNote, addNote, getNotes, putNote } from "../controllers/notesController.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const notesRouter = Router();

notesRouter.get('/notes', authMiddleware, getNotes);
notesRouter.post('/notes', authMiddleware, addNote);
notesRouter.put('/notes/:id', authMiddleware, putNote);
notesRouter.delete('/notes/:id', authMiddleware, deleteNote);