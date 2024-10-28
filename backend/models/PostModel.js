import mongoose from 'mongoose';
const { Schema } = mongoose;

// Esquema de respuestas (replies)
const replySchema = new Schema({
  replyText: { type: String, required: true },
  repliedAt: { type: Date, default: Date.now },
  authorName: {
    type: String,  // Nombre completo del autor
    required: true,
  },
  user: { type: String, required: true }  // Relacionar con el usuario
});

// Esquema de comentarios
const commentSchema = new Schema({
  commentText: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now },
  authorName: {
    type: String,  // Nombre completo del autor
    required: true,
  },
  user: { type: String, required: true },  // Relacionar con el usuario
  replies: [replySchema],  
});

// Esquema del post
const postSchema = new mongoose.Schema({
  content: {
      type: String,
      required: true
  },
  user: {
      type: String,  // Firebase UID o puedes cambiarlo a ObjectId si lo prefieres
      required: true
  },
  authorName: {
    type: String,  // Nombre completo del autor
    required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  PicturePath: {
      type: String,
      required: false,
  },
  comments: [commentSchema]  // Agregar el array de comentarios al esquema del post
});

export default mongoose.model('PostModel', postSchema);
