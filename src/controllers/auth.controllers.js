import { validationResult } from "express-validator";
import hashPassword, { hashPassword } from "../helpers/bcrypt.helper.js"
import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
    const errors = validationResult
    const {username, email, password, role, first_name, last_name, biography, avatar_url } = req.body
    try {
        const hashPassword = await hashPassword(password)

        const user = await UserModel.create({
            username: username,
            email: email,
            password: password,
            role: role
        })

        await ProfileModel.create({
            first_name: first_name,
            last_name: last_name,
            biography: biography,
            avatar_url: avatar_url

        })



    } catch (error) {
        
    }
};

// userRoutes.get(authMiddleware)
export const login = () => {};

export const logout = () => {};

export const updateProfile = () => {};


