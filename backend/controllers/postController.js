import PostModel from "../models/PostModel.js";
import InfoModel from '../models/InfoModel.js';
import { getPostsWithUserProfilePictures } from './Helpers/getPicturesForPost.js';
import { uploadImageToFirebase } from '../Middleware/multer.js';
import mongoose from "mongoose";

// Mostrar todos los posts con fotos de perfil
export const getAllPosts = async (req, res) => {
    try {
        const postsWithProfiles = await getPostsWithUserProfilePictures();
        res.json(postsWithProfiles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mostrar un post por ID con fotos de perfil en comentarios y respuestas
export const getAllPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await PostModel.find({ user: id }).sort({ createdAt: -1 }).lean();

        if (!posts.length) {
            return res.status(404).json({ message: "No se encontraron posts para el usuario" });
        }

        const userIds = new Set();
        posts.forEach(post => {
            userIds.add(post.user);
            post.comments.forEach(comment => {
                userIds.add(comment.user);
                comment.replies.forEach(reply => {
                    userIds.add(reply.user);
                });
            });
        });

        const userInfoArray = await InfoModel.find({ firebaseUid: { $in: Array.from(userIds) } });
        const userInfoMap = userInfoArray.reduce((acc, userInfo) => {
            acc[userInfo.firebaseUid] = userInfo.userProfilePath;
            return acc;
        }, {});

        for (const post of posts) {
            post.userProfilePath = userInfoMap[post.user] || null;
            for (const comment of post.comments) {
                comment.userProfilePath = userInfoMap[comment.user] || null;
                for (const reply of comment.replies) {
                    reply.userProfilePath = userInfoMap[reply.user] || null;
                }
            }
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener la información de los posts." });
    }
};

// Crear un nuevo post con imagen en Firebase
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "El usuario no está autenticado." });
        }

        const userInfo = await InfoModel.findOne({ firebaseUid: userId });
        if (!userInfo) {
            return res.status(404).json({ message: "No se encontró la información del usuario." });
        }

        let pictureUrl = null;
        if (req.file) {
            pictureUrl = await uploadImageToFirebase(req.file);
        }

        const newPost = await PostModel.create({
            content,
            user: userId,
            authorName: userInfo.fullname,
            createdAt: new Date(),
            PicturePath: pictureUrl,
        });

        res.status(201).json({
            message: "¡Post creado correctamente!",
            post: newPost,
        });
    } catch (error) {
        console.error("Error al crear el post:", error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un post
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "ID de post inválido" });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        if (String(post.user) === userId) {
            await post.deleteOne();
            return res.status(200).json({ message: "¡Post eliminado correctamente!" });
        } else {
            return res.status(403).json({ message: "No tienes permisos para eliminar este post" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

// Agregar un comentario a un post
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { commentText } = req.body;
        const userId = req.user.id;

        if (!commentText || commentText.trim() === '') {
            return res.status(400).json({ message: "El texto del comentario no puede estar vacío." });
        }

        const userInfo = await InfoModel.findOne({ firebaseUid: userId });
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        const newComment = { 
            commentText, 
            commentedAt: new Date(), 
            authorName: userInfo.fullname,  
            user: userId 
        };

        post.comments.push(newComment);
        await post.save();

        const savedComment = post.comments[post.comments.length - 1];
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
        const userId = req.user.id;

        if (!replyText || replyText.trim() === '') {
            return res.status(400).json({ message: "El texto de la respuesta no puede estar vacío." });
        }

        const userInfo = await InfoModel.findOne({ firebaseUid: userId });
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

        const newReply = { 
            replyText, 
            commentedAt: new Date(), 
            authorName: userInfo.fullname,  
            user: userId 
        };

        comment.replies.push(newReply);
        await post.save();

        const savedReply = comment.replies[comment.replies.length - 1];
        res.status(200).json(savedReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const userId = req.user.id;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        // Encontrar el comentario
        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        // Verificar permisos
        if (String(comment.user) === userId || String(post.user) === userId) {
            // Eliminar el comentario usando el método pull
            post.comments.pull({ _id: commentId });
            await post.save(); // Guardar el post actualizado en la base de datos
            return res.status(200).json({ message: "Comentario eliminado correctamente" });
        } else {
            return res.status(403).json({ message: "No tienes permisos para eliminar este comentario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};


export const deleteReply = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const replyId = req.params.replyId;
        const userId = req.user.id;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        // Encontrar el comentario
        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        // Encontrar la respuesta
        const reply = comment.replies.id(replyId);
        if (!reply) {
            return res.status(404).json({ message: "Respuesta no encontrada" });
        }

        // Permitir que el dueño del post o el autor de la respuesta la eliminen
        if (String(reply.user) === userId || String(post.user) === userId) {
            // Eliminar la respuesta del array de replies usando pull
            comment.replies.pull({ _id: replyId });
            await post.save(); // Guardar el post actualizado en la base de datos
            return res.status(200).json({ message: "Respuesta eliminada correctamente" });
        } else {
            return res.status(403).json({ message: "No tienes permisos para eliminar esta respuesta" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};
