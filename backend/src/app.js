import "dotenv/config";
import "./config/env.js";
import express from 'express';
import cors from 'cors';
import { notesRouter } from './routes/notesRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { authRouter } from "./routes/authRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({
    limit: "10kb"
}));

const allowedOrigins = [
    "http://localhost:5173",
    "https://revise-william-furquims-projects.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        console.log("Request Origin:", origin);

        // Permite requests sem origin (Postman, mobile apps etc)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    credentials: true
}));

app.get("/", (req, res) => {
    res.json({
        status: "Deploy Ok"
    });
});

app.use('/api/auth', authRouter);
app.use('/api', notesRouter);
app.use('/api', reviewRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));