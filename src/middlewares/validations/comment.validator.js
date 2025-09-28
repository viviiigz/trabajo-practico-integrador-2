import { body, param} from "express-validator";
import { Types } from "mongoose";
import CommentModel from '../../models/comment.model.js';


export const validateCommentIdInParams = [
    param('id')
        .custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('El ID del comment no es válido.');
            }
            return true;
        })
        .custom(async (value) => {
            const comment = await CommentModel.findById(value);
            if (!comment) {
                throw new Error('El comment con el ID especificado no existe.');
            }
        }),
];


export const createCommentValidator = [
    
    body('content')
        .trim()
        .notEmpty().withMessage('El contenido del comentario no puede estar vacío.')
        .isLength({ min: 1, max: 500 }).withMessage('El comentario debe tener entre 1 y 500 caracteres.'),
];


export const updateCommentValidator = [
    validateCommentIdInParams,
    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('El contenido del comentario no puede estar vacío.')
        .isLength({ min: 1, max: 500 }).withMessage('El comentario debe tener entre 1 y 500 caracteres.'),
];