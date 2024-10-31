import express from 'express';
import cors from 'cors';
import postRoutes from './routes/routes.js'; // Verifica la ruta según tu estructura de carpetas
import connectDB from './database/db.js'; // Ajusta la ruta si es necesario
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a la base de datos
connectDB().then(() => console.log("Database connected")).catch((error) => console.error("Database connection error:", error));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta de archivos estáticos para imágenes subidas (opcional en Vercel)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/posts', postRoutes); // Ruta principal para el CRUD de posts

const port = process.env.PORT || 8000;

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
