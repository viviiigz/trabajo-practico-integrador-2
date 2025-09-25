import { validationResult } from "express-validator";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js";
import UserModel from "../models/user.model.js";
import userModel from "../models/user.model.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role, profile } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username: username,
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
      message: "Usuario registrado correctamente",
      user: newUser.username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

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
};

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

//obtner perfil (user auth)
export const getProfile = async (req, res) => {
  const user = req.user.id;
  try {
    const userConProfile = await UserModel.findById(user).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no autenticado. Por favor inicie sesión" });
    }
    res.status(200).json(userConProfile);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error });
  }
};
//actualzar (user auth)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;

    //$set para actualizar el objeto incrustado 'profile'
    const updatedUser = await UserModel.findByIdAndUpdate(userId,
      { $set: { profile: profileData } },
      { new: true } // retorna el documento actualizado
    ).select("-password");

    res.status(200).json({
      msg: "Perfil actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el perfil" });
  }
};

