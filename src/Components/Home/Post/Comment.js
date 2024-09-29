// Comment.js
import React, { useState } from 'react';
import Reply from './Reply'; // Importar el componente Reply

const Comment = ({ comment, onReply }) => {
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    if (reply.trim() === '') return;
    onReply(reply);
    setReply(''); // Limpiar el input de respuesta
    setShowReplyInput(false); // Ocultar el input después de responder
  };

  return (
    <div className="bg-[#182637] p-3 rounded-lg mb-4">
      <div className="flex items-start space-x-4">
        <img
          src='/media/picture/images.png'
          alt="Usuario comentario"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="text-orange-400 font-semibold">Usuario comentario</h3>
          <p className="text-gray-300">{comment.commentText}</p>
          <div className="flex items-center text-gray-400 text-sm mt-2 space-x-4">
            <span>2 min</span>
            <span>Me gusta</span>
            <span
              className="cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Responder
            </span>
          </div>

          {showReplyInput && (
            <div className="mt-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Escribe una respuesta..."
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleReply}
                className="bg-orange-700 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-800"
              >
                Responder
              </button>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((replyItem) => (
                <Reply key={replyItem._id} replyItem={replyItem} /> 
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
