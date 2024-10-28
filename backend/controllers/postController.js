import PostModel from "../models/PostModel.js";
import InfoModel from '../models/InfoModel.js'; // Importar el modelo de la información del usuario
import { getPostsWithUserProfilePictures } from './Helpers/getPicturesForPost.js';
import { getRelativeFilePath } from '../Middleware/multer.js';
import mongoose from "mongoose";
//** Métodos para el CRUD de Posts **/


// Mostrar todos los posts
export const getAllPosts = async (req, res) => {
    try {
        const postsWithProfiles = await getPostsWithUserProfilePictures();
        res.json(postsWithProfiles);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Mostrar un post por ID
export const getAllPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostModel.find({user: id});
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
      const { content } = req.body;
      const userId = req.user.id;
      const relativePath = req.file ? getRelativeFilePath(req.file.path) : null;
      if (!userId) {
        return res.status(400).json({ message: "El usuario no está autenticado." });
      }
  
      const userInfo = await InfoModel.findOne({ firebaseUid: userId });
      if (!userInfo) {
        return res.status(404).json({ message: "No se encontró la información del usuario." });
      }
  
      const newPost = await PostModel.create({
        content,
        user: userId,
        authorName: userInfo.fullname,
        createdAt: new Date(),
        PicturePath: relativePath,
      });
  
      // Add debug logging here
      console.log('Ruta de la imagen:', relativePath);
  
      res.status(201).json({
        message: "¡Post creado correctamente!",
        post: newPost,
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
        const postId = req.params.id;
        const userId = req.user.id;
        
        
        // Validar si el ID del post es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "ID de post inválido" });
        }

        // Encontrar el post por ID
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        
        // Verificar si el post pertenece al usuario
        if (String(post.user) === userId) {
            await post.deleteOne();  // Eliminar el post si pertenece al usuario
            return res.status(200).json({ message: "¡Post eliminado correctamente!" });
        } else {
            return res.status(403).json({ message: "No tienes permisos para eliminar este post" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

// Agregar un comentario a un post
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

        const newComment = { commentText, commentedAt: new Date(), authorName: userInfo.fullname,  user: userId }; // Añadir `commentedAt`
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

        const newReply = { replyText, commentedAt: new Date(), authorName: userInfo.fullname,  user: userId };
        comment.replies.push(newReply);
        await post.save();

        const savedReply = comment.replies[comment.replies.length - 1];
        res.status(200).json(savedReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener foto de perfil de un usuario
// En tu controlador de rutas
export const getPostsController = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los posts." });
    }
};
