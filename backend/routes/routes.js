import express from 'express';
import { 
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost, 
    addComment, 
    addReply,
    getCommentsByPostId,
    getRepliesByCommentId
} from '../controllers/PostController.js';

const router = express.Router();

// Rutas de CRUD
router.get('/', getAllPosts);           // Obtener todos los posts
router.get('/:id', getPostById);        // Obtener un post por ID
router.post('/', createPost);           // Crear un nuevo post
router.put('/:id', updatePost);         // Actualizar un post por ID
router.delete('/:id', deletePost);      // Eliminar un post por ID

// Rutas para manejar comentarios y respuestas
router.post('/:id/comments', addComment); // Agregar un comentario a un post
router.get('/:id/comments', getCommentsByPostId); // Obtener todos los comentarios de un post
router.post('/:id/comments/:commentId/replies', addReply); // Agregar una respuesta a un comentario
router.get('/:id/comments/:commentId/replies', getRepliesByCommentId); // Obtener respuestas de un comentario

export default router;
