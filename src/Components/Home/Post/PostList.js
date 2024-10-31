import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { fetchPosts } from './services/PostService';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const URI = process.env.REACT_APP_API_URL + '/posts/'; ; // Asegúrate de que la URL sea la correcta
  
  // Función para obtener publicaciones desde la API


  useEffect(() => {
    const obtenerPosts = async () => {
      const reponse = await fetchPosts(URI);
      if(reponse){
      setPosts(reponse.data);
      }
  };
  obtenerPosts();
}, []);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      setPosts(posts.filter(post => post._id !== id));
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
