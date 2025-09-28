import { Router } from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isOwnerOrAdmin } from '../middlewares/ownerOrAdminMiddleware.js';
import { validator } from "../middlewares/validator.js"; 
import ArticleModel from '../models/article.model.js'; // Necesario para isOwnerOrAdmin
import TagModel from '../models/tag.model.js';
import { 
    createArticle,
    getAllPublishedArticles,
    getArticleById,
    getMyArticles,
    updateArticle,
    deleteArticle,
    addTagToArticle, 
    removeTagFromArticle,
} from '../controllers/article.controllers.js'; // Todas las funciones en un solo controlador

import { 
    createArticleValidator, 
    updateArticleValidator,
    validateArticleIdInParams,
    validateArticleIdAndTagId, 
    validateArticleId
} from '../middlewares/validations/article.validator.js'; 

export const articleRouter = Router();


//crear articulo
articleRouter.post(
    "/articles", 
    authMiddleware, 
    createArticleValidator, 
    validator, 
    createArticle
);

//listar articulos publicados
articleRouter.get(
    "/articles", 
    authMiddleware, 
    getAllPublishedArticles
);

// listar mis articylos
articleRouter.get(
    "/articles/my", 
    authMiddleware, 
    getMyArticles
);

// obtener un articulo por id con populate completo
articleRouter.get(
    "/articles/:id", 
    authMiddleware, 
    validateArticleId, 
    validator, 
    getArticleById
);

//actualizar un articulo
articleRouter.put(
    "/articles/:id",
    authMiddleware,
    isOwnerOrAdmin(ArticleModel, 'author'), //  El usuario debe ser el autor del Article o Admin
    updateArticleValidator, 
    validator,
    updateArticle
);

//eliminacio fisica
articleRouter.delete(
    "/articles/:id",
    authMiddleware,
    isOwnerOrAdmin(ArticleModel, 'author'), // 
    validateArticleId, 
    validator,
    deleteArticle
);


// relaciomn muchos a muchoss
articleRouter.post(
    "/articles/:articleId/tags/:tagId",
    authMiddleware,
    isOwnerOrAdmin(ArticleModel, 'author', 'articleId'),
    validateArticleIdAndTagId, 
    validator,
    addTagToArticle
);


articleRouter.delete(
    "/articles/:articleId/tags/:tagId",
    authMiddleware,
    isOwnerOrAdmin(ArticleModel, 'author', 'articleId'), 
    validateArticleIdAndTagId, 
    validator,
    removeTagFromArticle
);