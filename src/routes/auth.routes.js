import { Router } from "express";
import { createUserValidator } from "../middlewares/validations/user.validator.js";
import { profileValidator } from "../middlewares/validations/profile.validator.js";
import { register, login, logout } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";


export const authRouter = Router()

//rutas públicas
authRouter.post("/auth/register", profileValidator, createUserValidator, validator, register)

authRouter.post("/auth/login", login)

//rutas privadas
authRouter.post("/auth/logout", authMiddleware, logout)
