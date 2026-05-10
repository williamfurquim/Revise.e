import axios from "axios";
import type {
    tyNotes,
    tyCreateNote
} from "../types/allTypes";

export const api = axios.create({
    baseURL: "http://localhost:3000",
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

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export const get = () =>
    api.get<tyNotes[]>("/notes");

export const post = (
    data: tyCreateNote
) =>
    api.post<tyNotes>("/notes", data);

export const remove = (id: number) =>
    api.delete(`/notes/${id}`);

export const update = (
    id: number,
    data: tyCreateNote
) =>
    api.put(`/notes/${id}`, data);

export const login = (
    email: string,
    password: string
) =>
    api.post('/login', {
        email,
        password
    });

export const register = (
    name: string,
    email: string,
    password: string
) =>
    api.post('/register', {
        name,
        email,
        password
    });