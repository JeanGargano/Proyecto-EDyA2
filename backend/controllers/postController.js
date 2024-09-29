import PostModel from "../models/PostModel.js";
import mongoose from "mongoose";
//** Métodos para el CRUD de Posts **/


// Mostrar todos los posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un post por ID
export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar todos los comentarios de un post
export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        res.status(200).json(post.comments); // Devuelve los comentarios del post
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar una respuesta de un comentario específico
export const getRepliesByCommentId = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

        res.status(200).json(comment.replies); // Devuelve las respuestas del comentario
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo post
export const createPost = async (req, res) => {
    try {
        const newPost = await PostModel.create(req.body);
        res.status(201).json({
            message: "¡Post creado correctamente!",
            post: newPost
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un post
export const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post no encontrado" });
        res.status(200).json({
            message: "¡Post actualizado correctamente!",
            post: updatedPost
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Eliminar un post
export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        // Convertir el id a ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deletedPost = await PostModel.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: "Post no encontrado" });

        res.status(200).json({ message: "¡Post eliminado correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agregar un comentario a un post
// Agregar un comentario a un post
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { commentText } = req.body;

        if (!commentText || commentText.trim() === '') {
            return res.status(400).json({ message: "El texto del comentario no puede estar vacío." });
        }

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        // Crear nuevo comentario
        const newComment = { commentText };
        post.comments.push(newComment);
        await post.save();

        // Devolver solo el comentario recién creado
        const savedComment = post.comments[post.comments.length - 1]; // Último comentario
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agregar una respuesta a un comentario
export const addReply = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { replyText } = req.body;

        if (!replyText || replyText.trim() === '') {
            return res.status(400).json({ message: "El texto de la respuesta no puede estar vacío." });
        }

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

        // Crear nueva respuesta
        const newReply = { replyText };
        comment.replies.push(newReply);
        await post.save();

        // Devolver solo la respuesta recién creada
        const savedReply = comment.replies[comment.replies.length - 1]; // Última respuesta
        res.status(200).json(savedReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
