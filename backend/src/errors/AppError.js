// Herda da classe nativa Error do JavaScript
export class AppError extends Error {
    constructor(message, statusCode = 500) { 
        super(message); // Chama o construtor da classe Error
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}