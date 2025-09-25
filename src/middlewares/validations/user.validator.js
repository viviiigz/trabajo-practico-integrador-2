import { body, param } from "express-validator";
import { Types } from "mongoose";
import UserModel from "../../models/user.model.js";

//validarid
export const validateUserIdInParams = [
    param('id')
        .custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('El ID de usuario no es válido.');
            }
            return true;
        })
        .custom(async (value) => {
            const user = await UserModel.findById(value);
            if (!user) {
                throw new Error('El usuario con el ID especificado no existe.');
            }
        }),
];

export const createUserValidator = [
    //validar ell campo username
    body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isAlphanumeric().withMessage('El username debe ser alfanúmerico')
    .isLength({min: 3, max: 20}).withMessage('El username debe contener entre 3 y 20 caracteres')
    .custom(async(value)=>{
        const user = await UserModel.findOne({ username: value});
        if (user) {
            throw new Error('El username ya está en uso')
        }
    }),
    //vañidar el email
    body('email')
    .trim()
    .isEmail().withMessage('El formato del email no es válido')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error('El email ya está en uso');
      }
    }),

    //validar el password
    body('password')
    .isLength({min :8}).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),

    //validar el role
    body('role')
    .optional()
    .isInt(['user', 'admin']).withMessage('Rol inválido, solo puede ser "admin" o "user"')

]
