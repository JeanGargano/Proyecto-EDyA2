import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio donde se guardarán las imágenes (ruta absoluta)
const uploadDirectory = path.join(__dirname, '../uploads');

// Crea la carpeta si no existe
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Guardar en el directorio absoluto
    },
    filename: (req, file, cb) => {
        const uniqueFilename = Date.now() + path.extname(file.originalname); // Nombre único
        cb(null, uniqueFilename);
    }
});

// Configuración de multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
});

// Función para convertir a ruta relativa
export const getRelativeFilePath = (absolutePath) => {
    return path.relative(path.join(__dirname, '..'), absolutePath).replace(/\\/g, '/');
};

// Exportar el middleware
export default upload;
