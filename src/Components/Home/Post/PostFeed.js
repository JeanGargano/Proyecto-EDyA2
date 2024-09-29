import React, { useState, useEffect } from 'react';
import Publisher from '../Publisher';
import Post from './Post';
import axios from 'axios';

const PostFeed = () => {
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

  // Manejar la publicación de un nuevo post
  const handlePublish = async (content) => {
    const newPost = {
      content: content,
      postedAt: new Date().toISOString(),
    };

    try {
      // Publicar el nuevo post en la API y obtener la respuesta
      const response = await axios.post(URI, newPost);
      const createdPost = response.data.post; // Cambia esto para acceder al post dentro de la respuesta

      // Convertir el _id a string si es necesario
      const idAsString = createdPost._id.toString();

      console.log('Nuevo post creado:', createdPost); // Verifica que la respuesta sea correcta

      // Asegúrate de que la respuesta contenga todos los campos necesarios
      setPosts((prevPosts) => [{ ...createdPost, _id: idAsString }, ...prevPosts]); // Actualizar el estado con el nuevo post
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  // Manejar la eliminación de un post
  const handleDeletePostClick = async ( id ) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este post?');
    if (confirmDelete) {
        console.log(`Intentando eliminar el post con ID: ${id}`); // Verifica el ID aquí
        try {
            // Eliminar el post en la API
            const response = await axios.delete(`${URI}${id}`);

            // Verifica si la eliminación fue exitosa
            if (response.status === 200) {
                // Actualiza el estado para eliminar el post
                setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
            } else {
                console.error('Error al eliminar el post:', response.data.message);
            }
        } catch (error) {
            console.error('Error de red al eliminar el post:', error);
        }
    }
};


  return (
    <div>
      <Publisher onPublish={handlePublish} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post 
            key={post._id} // Usa _id de MongoDB como clave
            id={post._id} 
            content={post.content} // Asegúrate de que este campo exista en la respuesta
            handleDeletePostClick={handleDeletePostClick}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-4">No hay publicaciones aún.</p>
      )}
    </div>
  );
};

export default PostFeed;
