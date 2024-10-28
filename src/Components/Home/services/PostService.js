import axios from 'axios';

const URI = 'http://localhost:8000/posts/';

export const handleAddComment = async (postId, commentText, setComments, setComment, userToken) => {
  const newComment = { commentText };

  try {
    const response = await axios.post(`${URI}${postId}/comments`, newComment, {
      headers: {
        Authorization: `Bearer ${userToken}`, // Agregar userToken al header
      },
    });
    setComments((prevComments) => [...prevComments, response.data]);
    setComment('');
  } catch (error) {
    console.error('Error al agregar comentario:', error);
  }
};

export const handleAddReply = async (postId, commentId, replyText, setComments, userToken, fetchPostsComments) => {
  const newReply = { replyText };

  try {
    const response = await axios.post(`${URI}${postId}/comments/${commentId}/replies`, newReply, {
      headers: {
        Authorization: `Bearer ${userToken}`, // Agregar userToken al header
      },
    });
    setComments((prevComments) => prevComments.map((comment) =>
      comment._id === commentId ? { ...comment, replies: [...comment.replies, response.data] } : comment
    ));
    fetchPostsComments();
  } catch (error) {
    console.error('Error al agregar respuesta:', error);
  }
};
