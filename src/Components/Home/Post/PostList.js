import React, { useState } from 'react';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: 'Esta es la primera publicación.' },
    { id: 2, content: 'Aquí va la segunda publicación.' }
  ]);

  // Función para eliminar una publicación por su ID
  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          content={post.content}
          onDelete={() => handleDeletePost(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;
