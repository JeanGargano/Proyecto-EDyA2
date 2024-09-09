import React, { useState } from 'react';


const Post = ({ id, content, handleDeletePost }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddComment = () => {
    if (comment.trim() === '') return;
    setComments([...comments, { text: comment, replies: [] }]);
    setComment('');
  };

  const handleAddReply = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  return (
    <div className="bg-[#182637] text-white p-4 mt-8 rounded-lg w-full shadow-lg max-w-lg mx-auto relative">
      <div className="absolute top-2 right-2">
        <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-gray-200">
          <i className="fas fa-ellipsis-h">.</i>
          <i className="fas fa-ellipsis-h">.</i>
          <i className="fas fa-ellipsis-h">.</i>
        </button>
        {showOptions && (
          <div className="bg-gray-700 text-white rounded shadow-lg mt-2 absolute right-0">
            <button
              onClick={() => handleDeletePost(id)} // Asegúrate de que handleDeletePost esté definido
              className="block px-4 py-2 text-left text-red-500 hover:bg-gray-600 w-full"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <img
          src='/media/picture/images.png'
          alt="Usuario"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-orange-400 font-semibold">Usuario plataforma</h2>
          <span className="text-gray-400 text-sm">5h <i className="fas fa-globe-americas"></i></span>
        </div>
      </div>

      <p className="mb-4">
        {content}
      </p>

      <div className="text-gray-400 flex items-center justify-between mb-4">
        <span>183,982 me gustas</span>
        <span>{comments.length} comentarios</span>
      </div>
      <hr className="border-t border-gray-600 mb-4" />

      <div className="flex items-center justify-between text-orange-400 mb-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-thumbs-up"></i>
          <span>Me gusta</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-comment"></i>
          <span>Comentar</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-share"></i>
          <span>Compartir</span>
        </div>
      </div>

      {comments.length > 0 && (
        <div className="mb-4">
          {comments.map((commentItem, index) => (
            <Comment
              key={index}
              comment={commentItem}
              onReply={(replyText) => handleAddReply(index, replyText)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center space-x-4 mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          className="bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800"
        >
          Publicar
        </button>
      </div>
    </div>
  );
};
// Componente para mostrar comentarios y sus respuestas
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
          <p className="text-gray-300">{comment.text}</p>
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

          {/* Mostrar input para respuesta si se ha hecho clic en "Responder" */}
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

          {/* Mostrar respuestas si las hay */}
          {comment.replies.length > 0 && (
            <div className="ml-8 mt-4">
              {comment.replies.map((replyItem, idx) => (
                <div key={idx} className="flex items-start space-x-4 mb-2">
                  <img
                    src='/media/picture/images.png'
                    alt="Usuario respuesta"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h4 className="text-orange-400 font-semibold">Usuario respuesta</h4>
                    <p className="text-gray-300">{replyItem}</p>
                    <div className="text-gray-400 text-sm mt-2">Justo ahora</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Post;
