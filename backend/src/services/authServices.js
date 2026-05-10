import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";
import { generateToken } from "../utils/jwt.js";
import { validateString, validateEmail } from "../utils/validators.js";

export const authServices = {

    async register(data) {

        if (!data || typeof data !== "object") {
            throw new AppError(
                "Dados inválidos.",
                400
            );
        }

        const nameError = validateString(data.name, "Nome");
        const passwordError = validateString(data.password, "Senha", 8);
        const emailError = validateString(data.email, "Email");
        const invalidEmail = validateEmail(data.email);

        if (
            nameError ||
            emailError ||
            invalidEmail ||
            passwordError
        ) {
            throw new AppError(
                nameError ||
                emailError ||
                invalidEmail ||
                passwordError,
                400
            );
        }

        const name = data.name.trim();
        const email = data.email.trim();
        const password = data.password.trim();

        const userExists = await authRepository.findByEmail(email);

        if (userExists) {
            throw new AppError("Email já cadastrado.", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    },

    async login(data) {

        if (!data || typeof data !== "object") {
            throw new AppError(
                "Dados inválidos.",
                400
            );
        }

        const emailError = validateString(
            data.email,
            "Email"
        );

        const invalidEmail = validateEmail(
            data.email
        );

        const passwordError = validateString(
            data.password,
            "Senha",
            8
        );

        if (
            emailError ||
            invalidEmail ||
            passwordError
        ) {

            throw new AppError(
                emailError ||
                invalidEmail ||
                passwordError,
                400
            );
        }

        const email = data.email.trim();
        const password = data.password.trim();

        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new AppError(
                "Credenciais inválidas.",
                401
            );
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            throw new AppError(
                "Credenciais inválidas.",
                401
            );
        }

        const token = generateToken(user.id);

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}