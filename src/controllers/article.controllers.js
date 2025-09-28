import ArticleModel from "../models/article.model.js";
import CommentModel from "../models/comment.model.js";
import TagModel from "../models/tag.model.js";
import { validationResult } from "express-validator";

export const createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const authorId = req.user.id;
  const { title, content, excerpt, status, tags } = req.body;

  try {
    const newArticle = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author: authorId,
      tags: tags || [],
    });

    //  con un array o string separado por espacios
    const populatedArticle = await newArticle.populate([
      { path: "author", select: "username" }, // Popula autor, solo username
      { path: "tags", select: "name" }, // Popula tags, solo name
    ]);

    return res.status(201).json({
      message: "Artículo creado exitosamente.",
      article: populatedArticle,
    });
  } catch (error) {
    console.error("Error al crear artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllPublishedArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ status: "published" })
      .populate("author", "username")
      .populate("tags", "name");

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id)
      .populate("author", "username email profile")
      .populate("tags", "name description");

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Error al obtener artículo por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getMyArticles = async (req, res) => {
  const userId = req.user.id;
  try {
    // busca artículos donde el campo 'author' coincida con el id del usuario logueado
    const articles = await ArticleModel.find({ author: userId }).populate(
      "tags",
      "name"
    );

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Error al obtener mis artículos:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: updateData }, // Usa $set para actualizar solo los campos provistos
      { new: true }
    )
      .populate("author", "username")
      .populate("tags", "name");

    if (!updatedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    return res.status(200).json({
      message: "Artículo actualizado exitosamente.",
      article: updatedArticle,
    });
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    await CommentModel.deleteMany({ article: id });

    const deletedArticle = await ArticleModel.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    return res.status(200).json({
      message: "Artículo y sus comentarios han sido eliminados exitosamente.",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error al eliminar artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

//seccion de relacion nm
export const addTagToArticle = async (req, res) => {
  const { articleId, tagId } = req.params;

  try {
    // $addToSet agrega el tagId al array 'tags' del artículo, SOLO si no existe.
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $addToSet: { tags: tagId } },
      { new: true, select: "title tags" } // devuelve solo título y tags
    ).populate("tags", "name");

    if (!updatedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    return res.status(200).json({
      message: "Etiqueta agregada al artículo exitosamente.",
      tags: updatedArticle.tags,
    });
  } catch (error) {
    console.error("Error al agregar etiqueta a artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const removeTagFromArticle = async (req, res) => {
  const { articleId, tagId } = req.params;

  try {
    // $pull remueve la referencia del tagId del array 'tags'.
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $pull: { tags: tagId } },
      { new: true, select: "title tags" }
    ).populate("tags", "name");

    if (!updatedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado." });
    }

    return res.status(200).json({
      message: "Etiqueta removida del artículo exitosamente.",
      tags: updatedArticle.tags,
    });
  } catch (error) {
    console.error("Error al remover etiqueta de artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
