import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import Publisher from '../Publisher';

const PostFeed = ({ URI_PICTURE_PROFILE, depends, firebaseUid }) => {
  const [posts, setPosts] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const GET_POSTS_URI = 'http://localhost:8000/posts';

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(GET_POSTS_URI, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get(`${GET_POSTS_URI}/${getAuth().currentUser.uid}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  const fetchUserPosts = async () => {
    if (!firebaseUid) return; // No hacer fetch si no hay firebaseUid
    try {
      const response = await axios.get(`${GET_POSTS_URI}/${firebaseUid}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones del usuario específico:', error);
    }
  };

  useEffect(() => {
    if (userToken) {
      if (depends) {
        fetchMyPosts();
      } else if (firebaseUid) {
        fetchUserPosts();
      } else {
        fetchPosts();
      }
    }
  }, [userToken, depends]);

  const handlePublish = async (content, selectedFile) => {
    if (!userToken) return console.error('Error: Usuario no autenticado');
    try {
      const formData = new FormData();
      formData.append("content", content); // Añadir el contenido
      if (selectedFile) formData.append("file", selectedFile); // Añadir el archivo si existe
      await axios.post(`${GET_POSTS_URI}/create-post`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data", // Asegura el tipo de contenido correcto
        },
      });
      fetchPosts(); // Obtener posts de nuevo para actualizar
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  const handleDeletePostClick = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      try {
        await axios.delete(`${GET_POSTS_URI}/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
      } catch (error) {
        console.error('Error al eliminar el post:', error);
      }
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!userToken) return console.error('Error: Usuario no autenticado');
    try {
      await axios.post(`${GET_POSTS_URI}/${postId}/comment`, { commentText }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      fetchPosts(); // Refrescar posts para mostrar el nuevo comentario
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <>
          <Publisher onPublish={handlePublish} URI_PICTURE_PROFILE_PUBLISHER={URI_PICTURE_PROFILE} />

          <Post
            key={post._id}
            id={post._id}
            content={post.content}
            authorName={post.authorName}
            createdAt={post.createdAt}
            userProfilePath={post.userProfilePath}
            userToken={userToken}
            commentsData={post.comments}
            onAddComment={(commentText) => handleAddComment(post._id, commentText)} // Pasa handleAddComment con el id del post
            handleDeletePostClick={handleDeletePostClick} 
            postPicturePath={post.PicturePath}
          />
          </>
        ))
      ) : (
        <div className="text-center mt-4 text-gray-600">
          <h2 className="text-lg font-bold">No hay publicaciones disponibles.</h2>
          <p>Este usuario aún no ha realizado ninguna publicación.</p>
        </div>
      )}
    </div>
  );
}

export default PostFeed;
