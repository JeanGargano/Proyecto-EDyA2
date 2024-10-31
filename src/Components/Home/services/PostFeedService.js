// src/Services/PostFeedService.js
import axios from 'axios';

const GET_POSTS_URI = 'http://localhost:8000/posts';

export const getPosts = async (token) => {
  try {
    const response = await axios.get(GET_POSTS_URI, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};

export const getMyPosts = async (token, userId) => {
  try {
    const response = await axios.get(`${GET_POSTS_URI}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones del usuario actual:', error);
    throw error;
  }
};

export const getUserPosts = async (token, firebaseUid) => {
  if (!firebaseUid) return [];
  try {
    const response = await axios.get(`${GET_POSTS_URI}/${firebaseUid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las publicaciones del usuario específico:', error);
    throw error;
  }
};

export const createPost = async (token, content, selectedFile) => {
  if (!token) throw new Error('Error: Usuario no autenticado');
  
  const formData = new FormData();
  formData.append("content", content);
  if (selectedFile) formData.append("file", selectedFile);
  
  try {
    await axios.post(`${GET_POSTS_URI}/create-post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    throw error;
  }
};

export const deletePost = async (token, postId) => {
    
  if (!window.confirm('¿Estás seguro de que deseas eliminar este post?')) return;
  
  try {
    await axios.delete(`${GET_POSTS_URI}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    throw error;
  }
};

export const addComment = async (token, postId, commentText) => {
  if (!token) throw new Error('Error: Usuario no autenticado');
  
  try {
    await axios.post(`${GET_POSTS_URI}/${postId}/comment`, { commentText }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    throw error;
  }
};
