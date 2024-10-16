import axios from 'axios';

const API_URL = "http://localhost:8000/posts/user"; // Ajustada la URL

// Función para crear un nuevo registro de usuario
export const addUserInfo = async (userInfo) => {
    try {
        const response = await axios.post(API_URL, userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Devuelve los datos si todo sale bien
    } catch (error) {
        console.error('Error al crear el registro:', error.response?.data || error.message);
        throw error; // Relanza el error para manejarlo en el componente
    }
};
