export function validateString(value, fieldName, min = 1, max = 255) {

    if (typeof value !== "string") {
        return `${fieldName} deve ser uma string.`;
    }

    const trimmed = value.trim();

    if (trimmed.length < min) {
        return `${fieldName} é obrigatório.`;
    }

    if (trimmed.length > max) {
        return `${fieldName} excede o limite permitido.`;
    }

    return null;
}

export function validateEmail(email) {

    if (typeof email !== "string") {
        return "Email inválido.";
    }

    if (!email.includes("@")) {
        return "Email inválido.";
    }

    return null;
}

export function validateId(id) {

    const parsedId = Number(id);

    if (
        !Number.isInteger(parsedId) ||
        parsedId <= 0
    ) {
        return null;
    }

    return parsedId;
}