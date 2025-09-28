import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js"; 
import { validator } from "../middlewares/validator.js"; 
import { isOwnerOrAdmin } from '../middlewares/ownerOrAdminMiddleware.js'; 
import CommentModel from '../models/comment.model.js'; // para el isowner

import {
    createComment,
    getCommentsByArticle,
    getMyComments,
    updateComment,
    deleteComment,
} from '../controllers/comment.controllers.js';

import { 
    createCommentValidator, 
    updateCommentValidator,
    validateCommentIdInParams,
} from '../middlewares/validations/comment.validator.js'; 

import { validateArticleIdInParams } from '../middlewares/validations/article.validator.js';

export const commentRouter = Router();

//crear usuario auth
commentRouter.post(
    "/comments", 
    authMiddleware,          
    createCommentValidator, 
    validator,               
    createComment             
);

// listar por articulo auth
commentRouter.get(
    "/comments/article/:articleId", 
    authMiddleware,          
    validateArticleIdInParams,
    validator,
    getCommentsByArticle      
);

//listar mis comentarios
commentRouter.get(
    "/comments/my", 
    authMiddleware,          
    getMyComments             
);

//actualizar admin o autor
commentRouter.put(
    "/comments/:id", 
    authMiddleware,          
    isOwnerOrAdmin(CommentModel), //por el authorField
    updateCommentValidator,  
    validator,               
    updateComment             
);

//eliminar fidicamente
commentRouter.delete(
    "/comments/:id", 
    authMiddleware,          
    isOwnerOrAdmin(CommentModel), 
    validateCommentIdInParams, 
    validator,               
    deleteComment             
);