import React, { useState } from "react";
import ProfileImageModal from '../ProfileImageModal'; // Asegúrate de la ruta correcta

const InfoUserLeft = ({ nombreCompleto, profesion, imagenPerfil }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const URI = `http://localhost:8000/${imagenPerfil}`;

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <div className="w-[40%] bg-[#1F2937] p-8 rounded-lg flex flex-col items-center">
                <h2 className="text-white text-2xl mb-4">MI PERFIL</h2>
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer" onClick={toggleModal}>
                    {imagenPerfil ? (
                        <img src={URI} alt="Foto de perfil" className="object-cover w-full h-full" />
                    ) : (
                        <span className="text-gray-500">Nada</span>
                    )}
                </div>
                <h3 className="text-white text-xl mt-4">{nombreCompleto || "Nombre completo"}</h3>
                <p className="text-gray-400">{profesion || "Cargo / profesión"}</p>
            </div>

            {/* Modal para imagen de perfil */}
            <ProfileImageModal 
                isOpen={modalOpen} 
                onClose={toggleModal} 
                imageUrl={URI} 
            />
        </>
    );
};

export default InfoUserLeft; 
