import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import PostModel from '../models/PostModel.js'; // Asegúrate de tener tu modelo de Post importado

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Subdirectorio específico para imágenes de posts
const postImagesDirectory = path.join(__dirname, '../uploads/posts');
if (!fs.existsSync(postImagesDirectory)) {
    fs.mkdirSync(postImagesDirectory, { recursive: true });
}

// Configuración de almacenamiento
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, postImagesDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadPostImage = multer({
    storage: postStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
})// Usa "postImage" como campo para el archivo


export default uploadPostImage;
