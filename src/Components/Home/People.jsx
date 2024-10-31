import React, { useEffect, useState } from 'react';
import { getBasicUserInfo } from '../UserInfo/service/UserInfService';
import PostFeed from './Post/PostFeed'; // Asegúrate de importar tu componente PostFeed

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUserUid, setSelectedUserUid] = useState(null); // Estado para manejar el uid del usuario seleccionado
    const [imagenPerfil, setImagenPerfil] = useState('');
    const URI_PICTURE_PROFILE =  `http://localhost:8000/${imagenPerfil}` ;

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getBasicUserInfo();
            if (data) {
                setUsers(data);
            } else {
                setError("Error al obtener la información de usuarios.");
            }
        };
        fetchUsers();
    }, []);

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    // URL base de tu backend
    const BASE_URL = 'http://localhost:8000/'; // Cambia esto según tu configuración

    // Maneja el clic en el botón "Ver Publicaciones"
    const handleViewPosts = (firebaseUid) => {
        setSelectedUserUid(firebaseUid); // Establece el uid del usuario seleccionado
    };

    // Maneja el regreso a la lista de usuarios
    const handleGoBack = () => {
        setSelectedUserUid(null); // Restablece el uid seleccionado
    };

    // Si hay un usuario seleccionado, muestra el PostFeed
    if (selectedUserUid) {
        return (
            <div className="flex flex-col items-center"> {/* Asegúrate de que el contenedor sea un flex y esté centrado */}
            <PostFeed URI_PICTURE_PROFILE={URI_PICTURE_PROFILE} firebaseUid={selectedUserUid} />
            <button 
                className="mt-4 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800" // Elimina el ancho fijo
                onClick={handleGoBack} // Maneja el clic para regresar
            >
                Regresar a la lista de usuarios
            </button>
        </div>
        );
    }

    return (
        <div className="flex flex-col  p-6 rounded-lg max-w-2xl mx-auto mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Conoce a los usuarios del Blog!
            </h2>
            {users.length > 0 ? (
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.firebaseUid}
                            className="p-6 rounded-md shadow-2xl flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <img
                                    src={`${BASE_URL}${user.userProfilePath}` || '/media/picture/images.png'} 
                                    alt={user.fullname}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="pl-4 flex flex-col justify-center">
                                    <span className="text-gray-100 text-lg font-semibold">{user.fullname}</span>
                                    <p className="text-gray-300 font-semibold">{user.profession}</p>
                                </div>
                            </div>
                            <button 
                                className="ml-4 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800"
                                onClick={() => handleViewPosts(user.firebaseUid)} // Maneja el clic
                            >
                                Ver Publicaciones
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">Cargando información de usuarios...</p>
            )}
        </div>
    );
};

export default UserList;