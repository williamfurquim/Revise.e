import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError.js";

const JWT_CONFIG = {
    expiresIn: "7d",
    algorithm: "HS256"
};

export function generateToken(userId) {

    if (!userId) {
        throw new AppError(
            "Usuário inválido.",
            500
        );
    }

    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        JWT_CONFIG
    );
}