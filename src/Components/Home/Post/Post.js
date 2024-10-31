import React, { useState, useEffect } from 'react';
import { fetchComments } from '../services/CommentService'; // Ahora importamos fetchComments
import { handleAddComment, handleAddReply } from '../services/PostService';
import Comment from './Comment';
import { formatDistanceToNow } from 'date-fns'; // Importa formatDistanceToNow


const Post = ({ id, content, handleDeletePostClick, userToken, authorName, createdAt , userProfilePath, commentsData, fetchPosts, postPicturePath }) => { 
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const URI_PICTURE_PROFILE = userProfilePath ? `http://localhost:8000/${userProfilePath}` : '';
  const commentsDataUpload = commentsData;
  const URI_FILE_POST = postPicturePath ? `http://localhost:8000/${postPicturePath}` : '';
  const handleCommentSubmit = async () => {
    if (comment.trim() !== '') {
      await handleAddComment(id, comment, setComments, setComment, userToken);
      fetchPosts();
    }
  };

  const fetchPostsComments = () => {fetchPosts();}

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true }); // Usa `createdAt`

  return (
    <div className="bg-[#182637] text-white p-4 mt-8 rounded-lg w-full shadow-lg max-w-lg mx-auto relative">
      <div className="absolute top-2 right-2">
        <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-gray-200">
          <i className="fas fa-ellipsis-h">...</i>
        </button>
        {showOptions && (
          <div className="bg-gray-700 text-white rounded shadow-lg mt-2 absolute right-0">
            <button
              onClick={() => handleDeletePostClick(id)}
              className="block px-4 py-2 text-left text-red-500 hover:bg-gray-600 w-full"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
      <img src={URI_PICTURE_PROFILE || '/media/picture/images.png'} alt="Usuario" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-orange-400 font-semibold">{authorName}</h2> {/* Mostrar nombre del usuario */}
          <span className="text-gray-400 text-sm">{timeAgo} <i className="fas fa-globe-americas"></i></span> {/* Mostrar tiempo transcurrido */}
        </div>
      </div>

      <p className="mb-4">{content}</p>
      {postPicturePath && <img src={postPicturePath} alt="Publicación" className="w-full h-64 object-cover mb-4 rounded-lg" />}
      <hr className="border-t border-gray-600 mb-4" />
      <div className="text-gray-400 flex items-center justify-between mb-4">
        <span>183,982 me gustas</span>
        <span>{commentsData.length} comentarios</span>
      </div>
      <hr className="border-t border-gray-600 mb-4" />

      <div className="mb-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-orange-700 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-800"
        >
          Comentar
        </button>
      </div>

      {/* Mostrar los comentarios */}
      {commentsDataUpload.map((comment) => (
        <Comment 
          key={comment._id} 
          comment={comment} 
          userToken={userToken}
          userProfilePath={comment.userProfilePath}
          onReply={(replyText) => handleAddReply(id, comment._id, replyText, setComments, userToken, fetchPostsComments)} 
        />
      )
      )}
    </div>
  );
};

export default Post;
