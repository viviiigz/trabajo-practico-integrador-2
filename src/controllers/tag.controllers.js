import { validationResult } from "express-validator";
import TagModel from '../models/tag.model.js';
import { model } from "mongoose";

export const createTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newTag = await TagModel.create(req.body);

        return res.status(201).json({ 
            message: 'Etiqueta creada exitosamente.',
            tag: newTag 
        });

    } catch (error) {
        console.error('Error al crear la etiqueta:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find({}); 

        return res.status(200).json(tags);
    } catch (error) {
        console.error('Error al listar etiquetas:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getTagById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //uso de .populate('articles') 
        const tag = await TagModel.findById(req.params.id)
            .populate('articles'); 

        return res.status(200).json(tag);
    } catch (error) {
        console.error('Error al obtener etiqueta:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const updateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedTag = await TagModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );

        return res.status(200).json({ 
            message: 'Etiqueta actualizada exitosamente.',
            tag: updatedTag 
        });
    } catch (error) {
        console.error('Error al actualizar etiqueta:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' }); 
    }
};

export const deleteTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const ArticleModel = model('ArticleModel'); 

        // eliminacion en cascada
        // remover la referencia del Tag de TODOS los Articles
        await ArticleModel.updateMany(
            { tags: id }, 
            { $pull: { tags: id } } 
        );

        await TagModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'Etiqueta eliminada y su referencia removida de todos los artículos.',
            deletedId: id
        });
    } catch (error) {
        console.error('Error al eliminar etiqueta:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};