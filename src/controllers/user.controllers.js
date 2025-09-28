import UserModel from '../models/user.model.js';
import { model } from 'mongoose'; // Necesario para obtener otros modelos


export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({})
            .select("-password") 
            .populate('articles'); 

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
            .select("-password") 
            .populate('articles') 
            .populate('comments'); 

 
        if (!user) {
             return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


export const updateUser = async (req, res) => {
    try {

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, select: '-password' } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado para actualizar.' });
        }

        return res.status(200).json({ 
            message: 'Usuario actualizado exitosamente.',
            user: updatedUser 
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' }); 
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const ArticleModel = model('ArticleModel');
        const CommentModel = model('CommentModel');
        
        // eliminar todos los artículos creados por este usuario (el autor)
        await ArticleModel.deleteMany({ author: id });

        // eliminar todos los comentarios escritos por este usuario (el autor)
        await CommentModel.deleteMany({ author: id });
  
        await UserModel.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'Usuario y todos sus artículos/comentarios asociados han sido eliminados.',
            deletedId: id
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};