import axios from 'axios';
import { getAuth } from "firebase/auth";
const API_URL = "http://localhost:8000/posts/userinfo"; // Ajustada la URL

// Función para crear un nuevo registro de usuario

export const addUserInfo = async (userInfo) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error('El usuario no está autenticado.');
    }

    try {
        const token = await user.getIdToken();
        const response = await axios.post(API_URL, userInfo, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error al crear el registro:', error.response?.data || error.message);
        throw error;
    }
};

const URI = 'http://localhost:8000/posts/';

export const fetchUserInfo = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.log('No hay un usuario autenticado.');
            return null;
        }

        const token = await user.getIdToken();

        const response = await axios.get(`${URI}userinfo/get`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Corrección en el formato
            },
        });
        
        const { fullname, profession, email, phone, location, profileImage } = response.data;
        const formattedImagePath = profileImage.replace(/\\/g, '/');
        
        return {
            fullname,
            profession,
            email,
            phone,
            location,
            profileImage: formattedImagePath
        };
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error.message);
        return null;
    }
};
