import { authServices } from "../services/authServices.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {

    const user = await authServices.register(req.body);

    res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {

    const result = await authServices.login(req.body);

    res.json(result);
});