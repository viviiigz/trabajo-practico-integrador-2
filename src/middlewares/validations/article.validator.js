import { body, param } from "express-validator";
import ArticleModel from "../../models/article.model.js";
import TagModel from "../../models/tag.model.js";
import { Types } from "mongoose";

export const validateArticleIdInParams = [
  param("articleId")
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("El ID del articulo no es válido.");
      }
      return true;
    })
    .custom(async (value) => {
      // Verificación de existencia del Tag
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El articulo con el ID especificado no existe.");
      }
      return true;
    }),
];

export const validateArticleId = [
  param("id")
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("El ID del articulo no es válido.");
      }
      return true;
    })
    .custom(async (value) => {
      // Verificación de existencia del Tag
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El articulo con el ID especificado no existe.");
      }
      return true;
    }),
];
//valida los ids de article y tag para la relacion de nm
export const validateArticleIdAndTagId = [
  param("articleId")
    .notEmpty()
    .withMessage("El ID del artículo es requerido en la URL.")
    .isMongoId()
    .withMessage("El ID del artículo debe ser un formato válido (ObjectId).")
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("El ID del artículo no es válido.");
      }
      return true;
    })
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("El artículo especificado no existe.");
      }
      return true;
    }),

  param("tagId")
    .notEmpty()
    .withMessage("El ID de la etiqueta es requerido en la URL.")
    .isMongoId()
    .withMessage("El ID de la etiqueta debe ser un formato válido (ObjectId).")
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("El ID de la etiqueta no es válido.");
      }
      return true;
    })
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe.");
      }
      return true;
    }),
];

export const createArticleValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio.")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres."),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio.")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres."),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Este campo no puede exceder los 500 caracteres."),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage('El estado debe ser "published" o "archived".'),
];

export const updateArticleValidator = [
  // title
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres."),

  // content
  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres."),

  // excerpt
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El campo no puede exceder los 500 caracteres."),

  // status
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage('El estado debe ser "published" o "archived".'),
];
