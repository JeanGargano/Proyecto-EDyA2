// Reply.js
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Reply = ({replyItem}) => {

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
