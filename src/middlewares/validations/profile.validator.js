import { body } from "express-validator";

export const profileValidator = [
  //validar nombre
  body("profile.first_name") //se cambio para que busque dentro del body de user al objeto de profile
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
    .trim()
    .isAlphanumeric()
    .withMessage("El nombre debe contener solo letras"),
  //validar apellido
  body("profile.last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
    .isAlphanumeric()
    .withMessage("El apellido debe contener solo letras"),
  //validar bio
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracter"),
  //validar avatr
  body("profile.avatar_url")
    .optional()
    .isURL()
    .withMessage("Formato de la URL inválido"),
  //validar birth date
  body("profile.birth_date")
    .optional()
    .isISO8601()
    .withMessage("Formato inválido. El orden correcto es YYYY-MM-DD"),
];

export const updateProfileValidator = [
  body("profile.first_name") //se cambio para que busque dentro del body de user al objeto de profile
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
    .trim()
    .isAlphanumeric()
    .withMessage("El nombre debe contener solo letras"),
  //validar apellido
  body("profile.last_name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
    .isAlphanumeric()
    .withMessage("El apellido debe contener solo letras"),
  //validar bio
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracter"),
  //validar avatr
  body("profile.avatar_url")
    .optional()
    .isURL()
    .withMessage("Formato de la URL inválido"),
  //validar birth date
  body("profile.birth_date")
    .optional()
    .isISO8601()
    .withMessage("Formato inválido. El orden correcto es YYYY-MM-DD"),
];
