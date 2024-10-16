import mongoose from 'mongoose';
const { Schema } = mongoose;


const infoSchema = new Schema({
    id_user: { type: String, required: true },  
    fullname: { type: String, required: true },  
    email: { type: String, required: true }, 
    phoneNumber: { type: String, required: true },  
    location: { type: String, required: true },  
    profession: { type: String, required: true },  
},{ collection: 'users-info' });

export default mongoose.model('InfoModel', infoSchema);