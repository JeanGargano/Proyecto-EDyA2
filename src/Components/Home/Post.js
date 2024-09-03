import React from 'react';

const Post = () => {
  return (
    <div className="bg-[#182637] text-white p-4 mt-8 rounded-lg w-full shadow-lg max-w-lg mx-auto">
      {/* Información del usuario */}
      <div className="flex items-center mb-4">
        <img
          src='/media/picture/images.png' // Reemplaza con la URL de la imagen del usuario
          alt="Usuario"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-orange-400 font-semibold">Usuario plataforma</h2>
          <span className="text-gray-400 text-sm">5h <i className="fas fa-globe-americas"></i></span>
        </div>
      </div>

      {/* Contenido de la publicación */}
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi vel nunc pellentesque iaculis.
      </p>

      {/* Reacciones y acciones */}
      <div className="text-gray-400 flex items-center justify-between mb-4">
        <span>183,982 me gustas</span>
        <span>1 comentarios</span>
      </div>
      <hr className="border-t border-gray-600 mb-4" />

      <div className="flex items-center justify-between text-orange-400 mb-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-thumbs-up"></i>
          <span>Me gusta</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-comment"></i>
          <span>Comentar</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="fas fa-share"></i>
          <span>Compartir</span>
        </div>
      </div>

      {/* Comentario */}
      <div className="bg-[#182637] p-3 rounded-lg flex items-start space-x-4">
        <img
          src='/media/picture/images.png' // Reemplaza con la URL de la imagen del usuario del comentario
          alt="Usuario comentario"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="text-orange-400 font-semibold">Usuario plataforma</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi vel nunc pellentesque iaculis.
          </p>
          <div className="flex items-center text-gray-400 text-sm mt-2 space-x-4">
            <span>2 min</span>
            <span>Me gusta</span>
            <span>Responder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
