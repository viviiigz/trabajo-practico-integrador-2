import CommentModel from "../models/comment.model.js";
import { model } from "mongoose"; 
import { validationResult } from "express-validator";

export const createComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const authorId = req.user.id;
    const { content, articleId } = req.body;

    try {
        const newComment = await CommentModel.create({
            content,
            author: authorId,
            article: articleId,
        });

        return res.status(201).json({
            message: "Comentario creado exitosamente.",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error al crear comentario:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getCommentsByArticle = async (req, res) => {
    const { articleId } = req.params;

    try {
        const comments = await CommentModel.find({ article: articleId })
            .populate('author','username'); 
            
        return res.status(200).json(comments);

    } catch (error) {
        console.error('Error al obtener comentarios por artículo:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


export const getMyComments = async (req, res) => {
    const userId = req.user.id;

    try {
        const comments = await CommentModel.find({ author: userId })
            .populate('article', 'title'); 
            
        return res.status(200).json(comments);

    } catch (error) {
        console.error('Error al obtener mis comentarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


export const updateComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    const { id } = req.params;

    try {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            id,
            { content }, //pq solo este campo se puede actualizar
            { new: true }
        );

        if (!updatedComment) {
             return res.status(404).json({ message: "Comentario no encontrado." });
        }

        return res.status(200).json({
            message: "Comentario actualizado exitosamente.",
            comment: updatedComment,
        });
    } catch (error) {
        console.error("Error al actualizar comentario:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await CommentModel.findByIdAndDelete(id);
        
        if (!deletedComment) {
             return res.status(404).json({ message: "Comentario no encontrado." });
        }

        return res.status(200).json({
            message: "Comentario eliminado exitosamente.",
            deletedId: id,
        });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};


export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find()
            .populate("author")
            .populate("article", "title");

        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};