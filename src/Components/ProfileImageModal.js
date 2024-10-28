import React from "react";

const ProfileImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  // Función para manejar el clic en el fondo del modal
  const handleOverlayClick = (event) => {
    // Cerrar modal solo si el clic fue en el fondo
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick} // Agregar el evento de clic
    >
      <div className="bg-white rounded-full overflow-hidden p-2 relative">
        <img className="w-80 h-80 object-cover" src={imageUrl} alt="Perfil" />
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProfileImageModal;
