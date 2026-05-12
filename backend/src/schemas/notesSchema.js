import { z } from "zod";

export const createNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Título obrigatório")
        .max(60),

    note: z
        .string()
        .trim()
        .min(1, "Conteúdo obrigatório")
        .max(10000),
});

export const updateNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1)
        .max(60)
        .optional(),

    note: z
        .string()
        .trim()
        .min(1)
        .max(10000)
        .optional()
}).strict()
    .refine(
        data =>
            data.title !== undefined ||
            data.note !== undefined,
        {
            message: "Envie ao menos um campo."
        }
    );