// Comment.js
import React, { useState } from 'react';
import Reply from './Reply'; // Importar el componente Reply
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment, onReply, userToken }) => { // Recibe userToken como prop
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState(0); // Estado para controlar respuestas visibles
  const handleReply = () => {
    if (reply.trim() === '') return;
    onReply(reply, userToken); // Pasa userToken a la función onReply
    setReply('');
    setShowReplyInput(false);
  };

  const showMoreReplies = () => {
    setVisibleReplies((prev) => prev + 3); // Muestra 3 respuestas más cada vez
  };

  const ShowMenorReplies = () => {
    setVisibleReplies(0); // Oculta todas las respuestas
  };
  const timeAgo = formatDistanceToNow(new Date(comment.commentedAt), { addSuffix: true });

  const URI_PICTURE_PROFILE = comment.userProfilePath;

  return (
    <div className="bg-[#182637] p-3 rounded-lg mb-4">
      <div className="flex items-start space-x-4">
        <img
          src={URI_PICTURE_PROFILE || '/media/picture/images.png'}
          alt="Usuario comentario"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="text-orange-400 font-semibold">{comment.authorName}</h3>
          <p className="text-gray-300">{comment.commentText}</p>
          <div className="flex items-center text-gray-400 text-sm mt-2 space-x-4">
            <span>{timeAgo}</span>
            <span
              className="cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Responder
            </span>
            {visibleReplies < comment.replies.length && (
                <button onClick={showMoreReplies} className="text-gray-400 hover:text-gray-200 text-sm">
                  Ver respuestas
                </button>
              )}
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-0.5">
              {comment.replies.sort((a, b) => new Date(b.repliedAt) - new Date(a.repliedAt)).slice(0, visibleReplies).map((replyItem) => (
                <Reply key={replyItem._id} replyItem={replyItem} userToken={userToken} /> 
              ))}
              <div className="text-gray-400 flex items-center justify-between mb-0.5">
              {visibleReplies > 0 && (
                <>
                {visibleReplies > comment.replies.length ? null : 
                <button onClick={showMoreReplies} className="text-gray-400 hover:text-gray-200 text-sm">
                  ver más
                </button>}
                <button onClick={ShowMenorReplies} className="text-gray-400 hover:text-gray-200 text-sm">
                  Ocultar
                </button>
                </>
              )}
              </div>
            </div>
          )}

          {showReplyInput && (          
            <div className="border-gray-700 flex items-center bg-[#182637] rounded-b-lg">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe un mensaje..."
                id='inputReply'
              />
              <button
                className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700"
                onClick={handleReply}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
