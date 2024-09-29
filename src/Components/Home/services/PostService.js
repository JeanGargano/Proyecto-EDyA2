// src/services/postService.js

import { addComment, addReply } from './CommentService'; // Importar las funciones de servicio

// Función para manejar agregar un comentario
export const handleAddComment = async (postId, comment, setComments, setComment) => {
  if (comment.trim() === '') return;

  const tempId = Date.now(); // ID temporal para el nuevo comentario
  const newComment = {
    _id: tempId,
    commentText: comment,
    replies: [],
  };

  setComments(prev => [...prev, newComment]); // Añadir el comentario temporal
  setComment(''); // Limpiar el campo de comentario

  try {
    const savedComment = await addComment(postId, comment);
    setComments(prevComments =>
      prevComments.map(commentItem =>
        commentItem._id === tempId ? { ...savedComment, replies: [] } : commentItem
      )
    );
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
  }
};

// Función para manejar agregar una respuesta
export const handleAddReply = async (postId, commentId, replyText, setComments) => {
  if (replyText.trim() === '') return;

  const tempReplyId = Date.now();
  const newReply = {
    _id: tempReplyId,
    replyText,
  };

  setComments(prevComments =>
    prevComments.map(commentItem =>
      commentItem._id === commentId
        ? { ...commentItem, replies: [...commentItem.replies, newReply] }
        : commentItem
    )
  );

  try {
    const savedReply = await addReply(postId, commentId, replyText);
    setComments(prevComments =>
      prevComments.map(commentItem =>
        commentItem._id === commentId
          ? {
              ...commentItem,
              replies: commentItem.replies.map(replyItem =>
                replyItem._id === tempReplyId ? savedReply : replyItem
              ),
            }
          : commentItem
      )
    );
  } catch (error) {
    console.error('Error al agregar la respuesta:', error);
  }
};
