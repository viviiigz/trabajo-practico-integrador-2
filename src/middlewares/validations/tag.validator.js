import { body, param, validationResult } from "express-validator";
import { Types } from "mongoose";
import TagModel from '../../models/tag.model.js';



export const validateTagIdInParams = [
    param('id')
        .custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('El ID de etiqueta no es válido.');
            }
            return true;
        })
        .custom(async (value) => {
            // Verificación de existencia del Tag
            const tag = await TagModel.findById(value);
            if (!tag) {
                throw new Error('La etiqueta con el ID especificado no existe.');
            }
            return true;
        }),
];

export const createTagValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre de la etiqueta es obligatorio.')
        .isLength({ min: 2, max: 30 }).withMessage('El nombre debe contener entre 2 y 30 caracteres.')
        .custom(async (value) => {
            const tag = await TagModel.findOne({ name: value });
            if (tag) {
                throw new Error('El nombre de la etiqueta ya está en uso.');
            }
            return true;
        }),

    body('description')
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no puede exceder los 200 caracteres.'),
];

export const updateTagValidator = [
    body('name')
        .optional() 
        .trim()
        .notEmpty().withMessage('El nombre de la etiqueta es obligatorio.')
        .isLength({ min: 2, max: 30 }).withMessage('El nombre debe contener entre 2 y 30 caracteres.')
        .custom(async (value, { req }) => {
            const tag = await TagModel.findOne({ name: value });
            
            // nombre está en uso por OTRA etiqueta
            if (tag && tag._id.toString() !== req.params.id) {
                throw new Error('El nombre de la etiqueta ya está en uso por otra etiqueta.');
            }
            
            // el znombre ES el mismo que la etiqueta que se está actualizando
            const actualTag = await TagModel.findById(req.params.id);
            
            // si el nombre enviado es IGUAL al nombre actual en la DB:
            if (actualTag && actualTag.name === value) {
                throw new Error('El nuevo nombre debe ser diferente al nombre actual de la etiqueta.');
            }
            return true;
        }),

    body('description')
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no puede exceder los 200 caracteres.'),
];