import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Publisher from '../Publisher';
import Post from './Post';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  const handlePublish = (content) => {
    const newPost = {
      id: uuidv4(), // Generar un ID único
      content: content
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id) => {
    console.log(`Eliminar publicación con ID: ${id}`);
    const postActualizados = posts.filter(post => post.id !== id);
    setPosts(postActualizados);
  };

  return (
    <div>
      <Publisher onPublish={handlePublish} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post 
            key={post.id} 
            id={post.id} 
            content={post.content} 
            handleDeletePost={handleDeletePost}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-4">No hay publicaciones aún.</p>
      )}
    </div>
  );
};

export default PostFeed;
