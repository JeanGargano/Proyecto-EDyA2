// src/Components/PostFeed.js
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Post from './Post';
import Publisher from '../Publisher';
import { getPosts, getMyPosts, getUserPosts, createPost, deletePost, addComment } from '../services/PostFeedService';

const PostFeed = ({ URI_PICTURE_PROFILE, depends, firebaseUid }) => {
  const [posts, setPosts] = useState([]);
  const [userToken, setUserToken] = useState(null);

  const URI_PICTURE_PROFILE_PUBLISHER = URI_PICTURE_PROFILE;
  
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
    if (userToken) {
      const userId = getAuth().currentUser?.uid;
      try {
        if (depends && userId) {
          const myPosts = await getMyPosts(userToken, userId);
          setPosts(myPosts);
        } else if (firebaseUid) {
          const userPosts = await getUserPosts(userToken, firebaseUid);
          setPosts(userPosts);
        } else {
          const allPosts = await getPosts(userToken);
          setPosts(allPosts);
        }
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userToken, depends, firebaseUid]);

  const handlePublish = async (content, selectedFile) => {
    try {
      await createPost(userToken, content, selectedFile);
      fetchPosts(); // Refresca las publicaciones después de publicar
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  const handleDeletePostClick = async (id) => {
    try {
      await deletePost(userToken, id);
      setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      await addComment(userToken, postId, commentText);
      fetchPosts(); // Refresca las publicaciones después de agregar un comentario
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <div>
      <Publisher onPublish={handlePublish} URI_PICTURE_PROFILE_PUBLISHER={URI_PICTURE_PROFILE_PUBLISHER} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            content={post.content}
            authorName={post.authorName}
            createdAt={post.createdAt}
            userProfilePath={post.userProfilePath}
            userToken={userToken}
            commentsData={post.comments}
            onAddComment={(commentText) => handleAddComment(post._id, commentText)}
            handleDeletePostClick={handleDeletePostClick}
            postPicturePath={post.PicturePath}
            fetchPosts={fetchPosts}
          />
        ))
      ) : (
        <div className="text-center mt-4 text-gray-600">
          <h2 className="text-lg font-bold">No hay publicaciones disponibles.</h2>
          <p>Este usuario aún no ha realizado ninguna publicación.</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
