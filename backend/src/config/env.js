const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];

    if (!value || value.trim() === "") {
        throw new Error(`Variável de ambiente ausente ou vazia: ${envVar}`);
    }
}