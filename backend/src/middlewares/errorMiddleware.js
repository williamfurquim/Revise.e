import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {

    console.error(err);

    if (err.type === "entity.parse.failed"){
        return res.status(400).json({
            error: "JSON inválido."
        })
    }

    if (err.isOperational) {

        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    if (
        err instanceof Prisma.PrismaClientKnownRequestError
    ) {

        return res.status(400).json({
            error: "Erro no banco de dados."
        });
    }

    return res.status(500).json({
        error: "Erro interno do servidor."
    });
}