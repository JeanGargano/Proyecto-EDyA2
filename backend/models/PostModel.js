import mongoose from 'mongoose';
const { Schema } = mongoose;


const replySchema = new Schema({
  replyText: { type: String, required: true },  
  repliedAt: { type: Date, default: Date.now },  
});


const commentSchema = new Schema({
  commentText: { type: String, required: true },  
  commentedAt: { type: Date, default: Date.now },  
  replies: [replySchema],  
});

// Esquema del post
const postSchema = new Schema({
  content: { type: String, required: true }, 
  likes: { type: Number, default: 0 },  
  comments: [commentSchema],  
  postedAt: { type: Date, default: Date.now },  
}, { collection: 'posts' });  


export default mongoose.model('PostModel', postSchema);
