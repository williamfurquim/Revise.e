import { z } from 'zod'

export type LoginFormData =
    z.infer<typeof loginSchema>;

    export type RegisterFormData =
  z.infer<typeof registerSchema>;

export const registerSchema = z.object({
    email: z
        .string()
        .email("Email inválido"),

    password: z
        .string()
        .min(8, "Senha deve ter no mínimo 8 caracteres"),

    name: z
    .string()
    .max(25, "Nome muito grande")
    .min(2, "Nome obrigatório")
    .trim()
}).strict();

export const loginSchema = z.object({
    email: z
        .string()
        .email("Email inválido"),

    password: z
        .string()
        .min(8, "Senha inválida"),
}).strict();