// Esse código serve para capturar erros 
// automaticamente em funções async do Express.js

export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Transforma o resultado em Promise