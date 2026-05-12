import bcrypt from "bcrypt";

import { authRepository } from "../repositories/authRepository.js";

import { AppError } from "../errors/AppError.js";

import { generateToken } from "../utils/jwt.js";

export const authServices = {

    async register(data) {

        const userExists =
            await authRepository.findByEmail(data.email);

        if (userExists) {

            throw new AppError(
                "Email já cadastrado.",
                409
            );
        }

        const hashedPassword =
            await bcrypt.hash(data.password, 10);

        const user =
            await authRepository.create({
                name: data.name,
                email: data.email,
                password: hashedPassword
            });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    },

    async login(data) {

        const user =
            await authRepository.findByEmail(data.email);

        if (!user) {

            throw new AppError(
                "Credenciais inválidas.",
                401
            );
        }

        const passwordMatch =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!passwordMatch) {

            throw new AppError(
                "Credenciais inválidas.",
                401
            );
        }

        const token =
            generateToken(user.id);

        return {

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
};