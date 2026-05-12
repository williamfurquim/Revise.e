import { z } from "zod";

export type NoteFormData =
  z.infer<typeof noteSchema>;

export const noteSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório.")
    .max(60, "Título muito grande."),

    note: z
    .string()
    .trim()
    .min(1, "Digite algo para salvar.")
    .max(10000, "Anotação passou do limite de caracteres")
}).strict();