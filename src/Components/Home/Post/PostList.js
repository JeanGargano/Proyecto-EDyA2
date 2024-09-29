import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const URI = 'http://localhost:8000/posts/'; // Asegúrate de que la URL sea la correcta

  // Función para obtener publicaciones desde la API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(URI);
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  // Llamar a fetchPosts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para eliminar una publicación por su ID
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${URI}${id}`); // Eliminar el post en la API
      setPosts(posts.filter(post => post._id !== id)); // Actualizar el estado local
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post
            key={post._id} // Usa _id de MongoDB como clave
            content={post.content}
            onDelete={() => handleDeletePost(post._id)}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-4">No hay publicaciones aún.</p>
      )}
    </div>
  );
};

export default PostList;
