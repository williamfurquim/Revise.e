import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Email inválido"),

    password: z
        .string()
        .trim()
        .min(8, "Senha deve ter no mínimo 8 caracteres"),

    name: z
        .string()
        .trim()
        .max(25, "Nome muito grande")
        .min(2, "Nome obrigatório")
}).strict();

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Email inválido"),

    password: z
        .string()
        .trim()
        .min(8, "Senha inválida"),
}).strict();