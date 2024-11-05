import React, { useEffect, useState } from 'react';
import { getBasicUserInfo } from '../UserInfo/service/UserInfService';
import PostFeed from './Post/PostFeed';
import ProfileImageModal from '../../Shared/ProfileImageModal';

const UserList = (depends) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUserUid, setSelectedUserUid] = useState(null);
    const [imagenPerfil, setImagenPerfil] = useState('');
    const [noPosts, setNoPosts] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [modalImageUrl, setModalImageUrl] = useState(''); // Estado para la URL de la imagen del modal
    
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

    // Función para abrir el modal con la imagen de perfil
    const handleProfileImageClick = (imageUrl) => {
        setModalImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Maneja el clic en el botón "Ver Publicaciones"
    const handleViewPosts = (firebaseUid) => {
        setSelectedUserUid(firebaseUid);
    };

    // Maneja el regreso a la lista de usuarios
    const handleGoBack = () => {
        setSelectedUserUid(null);
    };

    if (selectedUserUid) {
        return (
            <div>
                <PostFeed 
                    URI_PICTURE_PROFILE={imagenPerfil} 
                    firebaseUid={selectedUserUid} 
                    onNoPosts={() => setNoPosts(true)}
                />
                {noPosts && (
                    <div className="mt-4 text-center text-gray-600">
                        <h2 className="text-lg font-bold">No hay publicaciones disponibles.</h2>
                        <p>Este usuario aún no ha realizado ninguna publicación.</p>
                    </div>
                )}
                <button 
                    className="mt-4 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800" 
                    onClick={handleGoBack} 
                >
                    Regresar a la lista de usuarios
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-6 rounded-lg max-w-2xl mx-auto mt-8 space-y-4">
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
                                    src={user.userProfilePath || '/media/picture/images.png'}
                                    alt={user.fullname}
                                    className="w-12 h-12 rounded-full cursor-pointer"
                                    onClick={() => handleProfileImageClick(user.userProfilePath || '/media/picture/images.png')}
                                />
                                <div className="pl-4 flex flex-col justify-center">
                                    <span className="text-gray-100 text-lg font-semibold">{user.fullname}</span>
                                    <p className="text-gray-300 font-semibold">{user.profession}</p>
                                </div>
                            </div>
                            <button 
                                className="ml-4 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800"
                                onClick={() => handleViewPosts(user.firebaseUid)}
                            >
                                Ver Publicaciones
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">Cargando información de usuarios...</p>
            )}
            {/* Modal para la imagen de perfil */}
            <ProfileImageModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                imageUrl={modalImageUrl} 
            />
        </div>
    );
};

export default UserList;
