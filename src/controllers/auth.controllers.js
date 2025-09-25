import { validationResult } from "express-validator";
import {generateToken} from "../helpers/jwt.helper.js"
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js"
import UserModel from "../models/user.model.js";


export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role, profile } = req.body;

    try {

        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            username:username,
            email: email,
            password: hashedPassword,
            role: role,
            profile: {
                first_name: profile.first_name,
                last_name: profile.last_name,
                biography: profile.biography,
                avatar_url: profile.avatar_url,
                birth_date: profile.birth_date,
            },
        });

        return res.status(201).json({ 
            message: 'Usuario registrado correctamente',
            user: newUser.username,
        });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const login = async(req, res) => {
    const {username, password } = req.body;

    try {
      const user = await UserModel.findOne({
      username: username,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Logeado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      msg: "Logout exitoso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

//falta obtner perfil (user auth)

//actualzar (user auth)
export const updateProfile = () => {};


