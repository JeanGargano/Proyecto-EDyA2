// Reply.js
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Reply = ({ replyItem, postId, commentId, onDeleteReply, userToken }) => {

  const [showOptions, setShowOptions] = useState(false); // Estado para opciones de comentario
  const timeAgo = formatDistanceToNow(new Date(replyItem.repliedAt), { addSuffix: true });
  const URI_PICTURE_PROFILE = replyItem.userProfilePath 
  return (
    <div className="bg-[#182637] p-2 rounded-lg mb-0.5">
      <div className="flex items-start space-x-2">
        <img
          src={URI_PICTURE_PROFILE || '/media/picture/images.png'}
          alt="Usuario respuesta"
          className="w-6 h-6 rounded-full"
        />
        <div>
          <h4 className="text-orange-400 font-semibold">{replyItem.authorName}</h4>
          <button onClick={() => setShowOptions(!showOptions)} className="absolute right-0 ml-2 text-gray-400 hover:text-gray-200">
              <i className="fas fa-ellipsis-h">...</i>
            </button>
            {showOptions && (
            <div className="absolute right-5 my-15 mt-2 bg-gray-700 text-white rounded shadow-lg">
              <button
                onClick={() => onDeleteReply(replyItem._id, postId, commentId)} // Llama a la función para eliminar la respuesta
                className="block px-4 py-2 text-left text-red-500 hover:bg-gray-600 w-full"
              >
                Eliminar
              </button>
            </div>
          )}
          <p className="text-gray-300">{replyItem.replyText}</p>
          <div className="flex items-center text-gray-400 text-sm mt-1 space-x-2">
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
