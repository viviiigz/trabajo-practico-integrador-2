import { body, param } from "express-validator";
import ArticleModel from "../../models/article.model.js";
import { Types } from "mongoose";

export const validateArticleIdInParams = [
    param('id')
        .custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('El ID del articulo no es válido.');
            }
            return true;
        })
        .custom(async (value) => {
            // Verificación de existencia del Tag
            const article = await ArticleModel.findById(value);
            if (!article) {
                throw new Error('El articulo con el ID especificado no existe.');
            }
            return true;
        }),
];
