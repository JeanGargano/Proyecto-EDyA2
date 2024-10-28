import axios from 'axios'; // Asegúrate de tener axios importado
const URI = 'http://localhost:8000/posts/'; // Reemplaza con tu URI correcta

export const fetchComments = async (postId, userToken) => {
  try {
    const response = await fetch(`${URI}${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    return Array.isArray(data) ? data : []; // Siempre retorna un array
  } catch (error) {
    console.error('Error fetching comments:', error);
    return []; // Retorna un array vacío en caso de error
  }
};


export const addComment = async (postId, commentText, userToken) => {
  try {
    const response = await axios.post(
      `${URI}${postId}/comments`, 
      { commentText }, 
      { headers: { Authorization: `Bearer ${userToken}` } } // Agregar token en los headers
    );
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

export const addReply = async (postId, commentId, replyText, userToken) => {
  try {
    const response = await axios.post(
      `${URI}${postId}/comments/${commentId}/replies`, 
      { replyText }, 
      { headers: { Authorization: `Bearer ${userToken}` } } // Agregar token en los headers
    );
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
