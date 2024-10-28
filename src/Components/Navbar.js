import React, { useState } from "react";
import '../Stylesheet/Home/Navbar.css';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import ProfileImageModal from "./ProfileImageModal";

export default function Navbar({ URI_PICTURE_PROFILE, nombreCompleto }) {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Antes de eliminar el token",localStorage.getItem("token"));
            localStorage.removeItem("token");
            console.log("Después de eliminar el token",localStorage.getItem("token"));
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    

    const redirectFeed = () => {
        navigate("/home");
    };

    const redirectInfo = () => {
        navigate("/info");
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 ColorPage">
                <div className="w-full flex items-center justify-between mx-0 px-5 py-4">
                    
                    {/* Sección de perfil - Foto y nombre alineados a la izquierda */}
                    <div className="flex items-center cursor-pointer" onClick={redirectInfo}>
                        <img src={URI_PICTURE_PROFILE} alt="User name" className="w-12 h-12 rounded-full" />
                        <span className="text-white text-lg font-semibold ml-2">{nombreCompleto}</span>
                    </div>

                    {/* Logo al centro */}
                    <button onClick={redirectFeed} className="flex items-center">
                        <img src="/media/picture/logo.png" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Icon</span>
                    </button>

                    {/* Menú de usuario y botón de logout a la derecha */}
                    <div className="flex items-center">
                        <button onClick={toggleModal} type="button" className="flex text-sm bg-gray-800 rounded-full">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={URI_PICTURE_PROFILE} alt="user photo" />
                        </button>
                        <button onClick={handleLogout} className="text-white ml-2">Log out</button>
                    </div>
                </div>
            </nav>

            {/* Modal para imagen de perfil */}
            <ProfileImageModal 
                isOpen={modalOpen} 
                onClose={toggleModal} 
                imageUrl={URI_PICTURE_PROFILE} 
            />
        </>
    );
}
