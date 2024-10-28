import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: String,
  email: String,
  phone: String,
  location: String,
  profession: String,
  userProfilePath: String,
});

const InfoModel = mongoose.model('UserInfo', InfoSchema);

export default InfoModel;
