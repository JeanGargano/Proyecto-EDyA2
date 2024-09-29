import express from 'express';
import cors from 'cors';
import postRoutes from './routes/routes.js'; // Asegúrate de que la ruta es correcta
import connectDB from './database/db.js'; // Ajusta la ruta si es necesario

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas de posts
app.use('/posts', postRoutes); // Asegúrate de que esta línea esté bien configurada

// Iniciar el servidor
app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
