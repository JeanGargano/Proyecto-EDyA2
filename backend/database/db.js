import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eda';;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;
