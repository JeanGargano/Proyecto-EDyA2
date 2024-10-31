import axios from 'axios';
import { getAuth } from "firebase/auth";
import { useAuth } from "../Context/AuthProvider";

const API_URL = process.env.URLAPP || "http://localhost:8000/posts/userinfo";

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

export const fetchUserInfo = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.log('No hay un usuario autenticado.');
        return null;
    }

    try {
        const token = await user.getIdToken();
        const response = await axios.get(`${API_URL}/userinfo/get`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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

export const getBasicUserInfo = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error('No hay un usuario autenticado.');
    }

    try {
        const token = await user.getIdToken();
        const response = await axios.get(`${API_URL}/basic`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener la información básica de usuarios:', error);
        throw error;
    }
};