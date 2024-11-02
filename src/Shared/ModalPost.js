import React, { useEffect } from "react";

const ProfileImageModal = ({ isOpen, onClose, imageUrl }) => {
  // Maneja el clic en el fondo del modal para cerrarlo
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // useEffect se ejecuta siempre, pero sólo activa el listener si isOpen es true
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Renderizado condicional del contenido del modal
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white  overflow-hidden p-0.5 relative">
        <img className="w-80 h-80 object-cover" src={imageUrl} alt="Perfil" />
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
        >
        </button>
      </div>
    </div>
  );
};

export default ProfileImageModal;
