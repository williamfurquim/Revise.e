const requiredEnvVars = [
    "DATABASE_URL",
    "JWT_SECRET"
];

requiredEnvVars.forEach((envVar) => {

    if (!process.env[envVar]) {

        throw new Error(
            `Variável de ambiente ausente: ${envVar}`
        );
    }
});