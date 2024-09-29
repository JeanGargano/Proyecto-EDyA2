// src/components/Post.js

import React, { useState, useEffect } from 'react';
import { fetchComments } from '../services/CommentService';
import { handleAddComment, handleAddReply } from '../services/PostService'; // Importar las funciones
import Comment from './Comment';

const Post = ({ id, content, handleDeletePostClick }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  // Cargar los comentarios al montar el componente
  useEffect(() => {
    const loadComments = async () => {
      const commentsData = await fetchComments(id);
      setComments(commentsData);
    };
    loadComments();
  }, [id]);

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
        <img src='/media/picture/images.png' alt="Usuario" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-orange-400 font-semibold">Usuario plataforma</h2>
          <span className="text-gray-400 text-sm">5h <i className="fas fa-globe-americas"></i></span>
        </div>
      </div>

      <p className="mb-4">{content}</p>

      <div className="text-gray-400 flex items-center justify-between mb-4">
        <span>183,982 me gustas</span>
        <span>{comments.length} comentarios</span>
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
          onClick={() => handleAddComment(id, comment, setComments, setComment)}
          className="bg-orange-700 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-800"
        >
          Comentar
        </button>
      </div>

      {/* Mostrar los comentarios */}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onReply={(replyText) => handleAddReply(id, comment._id, replyText, setComments)} />
      ))}
    </div>
  );
};

export default Post;
