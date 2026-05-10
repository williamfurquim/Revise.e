import "./config/env.js";
import express from 'express';
import cors from 'cors';
import { notesRouter } from './routes/notesRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { authRouter } from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json({
    limit: "10kb"
}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api', notesRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));