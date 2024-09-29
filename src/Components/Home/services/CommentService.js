// src/services/commentService.js

import axios from 'axios';

const URI = "http://localhost:8000/posts/";

export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${URI}${postId}/comments`);
    if (response.status === 200) {
      return response.data.map(comment => ({
        ...comment,
        _id: String(comment._id),
        replies: comment.replies.map(reply => ({
          ...reply,
          _id: String(reply._id),
        })),
      }));
    } else {
      console.error('Error al cargar los comentarios');
      return [];
    }
  } catch (error) {
    console.error('Error de red al cargar comentarios:', error);
    return [];
  }
};

export const addComment = async (postId, commentText) => {
  try {
    const response = await axios.post(`${URI}${postId}/comments`, { commentText });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error al agregar el comentario');
    }
  } catch (error) {
    console.error("Error al agregar el comentario:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const addReply = async (postId, commentId, replyText) => {
  try {
    const response = await axios.post(`${URI}${postId}/comments/${commentId}/replies`, { replyText });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error al agregar la respuesta');
    }
  } catch (error) {
    console.error('Error de red al agregar respuesta:', error);
    throw error;
  }
};
