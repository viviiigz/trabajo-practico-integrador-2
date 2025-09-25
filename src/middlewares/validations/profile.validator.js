import { body } from 'express-validator';

export const profileValidator = [
//validar nombre    
  body('first_name')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .isAlphanumeric().withMessage('El nombre debe contener solo letras'),
//validar apellido
  body('last_name')
    .isLength({ min: 2, max: 50 }).withMessage('El apellido debe contener entre 2 y 5o caracteres')
    .isAlphanumeric().withMessage('El apellido debe contener solo letra'),
 //validar bio   
  body('biography')
    .optional()
    .isLength({ max: 500 }).withMessage('La biografía no puede exceder los 500 caracter'),
 //validar avatr   
  body('avatar_url')
    .optional()
    .isURL().withMessage('Formato de la URL inválido'),
//validar birth date
  body('birth_date')
    .optional()
    .isISO8601().withMessage('Formato inválido. El orden correcto es YYYY-MM-DD'),
];