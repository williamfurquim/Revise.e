import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token não enviado.", 401);
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        throw new AppError("Token inválido.", 401);
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!decoded || typeof decoded !== "object" || !decoded.userId) {
            throw new AppError("Token inválido.", 401);
        }

        req.userId = decoded.userId;
        next();

    } catch {
        throw new AppError("Token inválido.", 401);
    }
}