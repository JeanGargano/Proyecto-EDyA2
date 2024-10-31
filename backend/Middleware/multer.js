import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import admin from './firebase-admin.js';

const bucket = admin.storage().bucket();

// Configuración de `multer` para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
});

// Función para subir archivos a Firebase Storage
export const uploadImageToFirebase = async (file) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => reject(error));

        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

// Exportar el middleware de multer
export default upload;
