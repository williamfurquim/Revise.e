import axios from "axios";
import type { tyNotes, tyCreateNote } from "../types/allTypes";

// ===== Inicialização do Axios =====
// Possível remoção do "export"
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.log("401 interceptado:", error.response.data);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// ===== CRUD DE ANOTAÇÕES - Promisse =====

export const get = () => api.get<tyNotes[]>("/notes");

export const post = (data: tyCreateNote) => api.post<tyNotes>("/notes", data);

export const remove = (id: number) => api.delete(`/notes/${id}`);

export const update = (id: number, data: tyCreateNote) => api.put(`/notes/${id}`, data);

// ===== AUTENTICAÇÃO =====

export const login = (email: string, password: string) => api.post('/auth/login', {
    email,
    password
});

export const register = (
    name: string,
    email: string,
    password: string
) => api.post('/auth/register', {
    name,
    email,
    password
});

// ==== TROCAR INFORMAÇÃO (REPETIÇÕES DE REVISÃO / TUTORIAL COMPLETO OU NÃO) =====

export const patch = (id: number) => api.patch(`/review/${id}/review-count`);

export const finishTutorial = () => api.patch('/auth/tutorial');