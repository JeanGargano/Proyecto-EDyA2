import React, { useState } from 'react';
import { handleAddComment, handleAddReply } from '../services/PostService';
import Comment from './Comment';
import ModalPost from '../../../Shared/ModalPost';
import { formatDistanceToNow } from 'date-fns';
import { deleteComment, deleteReply } from '../services/CommentService';

const Post = ({ 
  id, 
  content, 
  handleDeletePostClick, 
  userToken, 
  authorName, 
  createdAt, 
  userProfilePath, 
  commentsData, 
  fetchPosts, 
  postPicturePath 
}) => { 
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false); // Estado para controlar la visibilidad del campo de comentario

  const handleCommentSubmit = async () => {
    if (comment.trim() !== '') {
      await handleAddComment(id, comment, setComments, setComment, userToken);
      fetchPosts();
      setIsCommentInputVisible(false); // Ocultar campo de comentario después de enviar
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(userToken, id, commentId);
      fetchPosts();
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  };

  const onDeleteReply = async (commentId, replyId) => {
    try {
      await deleteReply(id, commentId, replyId, userToken); // Agregamos id como postId
      fetchPosts();
    } catch (error) {
      console.error('Error al eliminar la respuesta:', error);
    }
  };
  
  

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showMoreComments = () => {
    setVisibleComments((prevVisible) => prevVisible + 3);
  };

  const showMoreCommetsWithButtonComments = () => {
    setVisibleComments(3);
  };

  const hideAllComments = () => {
    setVisibleComments(0);
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="bg-[#182637] text-white p-4 mt-8 rounded-lg w-full shadow-lg max-w-lg mx-auto relative">
      <div className="absolute top-2 right-2">
        <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-gray-200">
          <i className="fas fa-ellipsis-h">...</i>
        </button>
        {showOptions && (
          <div className="bg-gray-700 text-white rounded shadow-lg mt-2 absolute right-0">
            <button
              onClick={() => handleDeletePostClick(id, userToken)}
              className="block px-4 py-2 text-left text-red-500 hover:bg-gray-600 w-full"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <img 
          src={userProfilePath || '/media/picture/images.png'} 
          alt="Usuario" 
          className="w-12 h-12 rounded-full mr-4" 
        />
        <div>
          <h2 className="text-orange-400 font-semibold">{authorName}</h2>
          <span className="text-gray-400 text-sm">{timeAgo}</span>
        </div>
      </div>

      <p className="mb-4">{content}</p>
      
      {postPicturePath && (
        <img 
          src={postPicturePath} 
          alt="Publicación" 
          className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer" 
          onClick={() => openModal(postPicturePath)}
        />
      )}

      <ModalPost 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={modalImageUrl} 
      />

      <hr className="border-t border-gray-600 mb-4" />
      <div className="text-gray-400 flex items-center justify-between mb-4">
        <a href='#commetInput'>
        <button
          onClick={() => {setIsCommentInputVisible(true) 
            showMoreCommetsWithButtonComments()
          }}
          className="text-gray-400 hover:text-orange-400"
        >
          &nbsp;
          Comentar
        </button>
        </a>
        <span>{commentsData.length} comentarios</span>
      </div>
      <hr className="border-t border-gray-600 mb-4" />
      {/* Mostrar solo la cantidad de comentarios controlada por visibleComments */}
      {commentsData.sort((a, b) => new Date(b.commentedAt) - new Date(a.commentedAt)).slice(0, visibleComments).map((comment) => (
        <Comment 
        key={comment._id} 
        comment={comment} 
        userToken={userToken}
        onReply={(replyText) => handleAddReply(id, comment._id, replyText, setComments, userToken, fetchPosts)}
        onDelete={() => handleDeleteComment(comment._id)} 
        onDeleteReply={(replyId) => onDeleteReply(comment._id, replyId)} // Ahora se pasa comment._id y replyId
        />
      ))}
      <div className="text-gray-400 flex items-center justify-between mb-4">
        {visibleComments < commentsData.length && (
        <button
          onClick={showMoreComments}
          className="text-gray-400 flex items-center justify-between hover:text-gray-200"
        >
          Ver más comentarios
        </button>
      )}
      {visibleComments > 0 && (
        <button
          onClick={hideAllComments}
          className="text-gray-400 flex items-center justify-between hover:text-gray-200"
        >
          Ocultar comentarios
        </button>
      )}
      </div>
      {isCommentInputVisible && (

        <div className="p-3 border-t border-gray-700 flex items-center bg-[#182637] rounded-b-lg">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un mensaje..."
          id='commetInput'
        />

        <button
          className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700"
          onClick={handleCommentSubmit}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>
      )}
    </div>
  );
};

export default Post;
