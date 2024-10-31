import React from 'react';
import '../../Stylesheet/Home/LeftNavbar.css';
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="px-6 py-2 border rounded-r-lg border-orange-600 text-black font-bold transform hover:-translate-y-1 transition duration-400 hover:underline decoration-white hover:bg-orange-800">
    {icon}
    <span className="text-white">{label}</span>
  </button>
);

const LeftSidebar = ({ nombreCompleto, URI, setActiveComponent }) => {
  const navigate = useNavigate();

  // Modificado para cambiar el componente activo al mismo tiempo que navega
  const handleClick = () => {
    setActiveComponent('Profile'); // Cambia a 'Profile' o el nombre del componente correspondiente
    navigate('/info');
  };

  return (
    <div className="w-64 h-screen p-4 fixed left-0 top-0 mt-16 hidden md:block">
      <div className="space-y-4 pt-8 text-justify">
        <SidebarItem
          icon={<span className="text-orange-400">🙋 </span>}
          label="Mi Perfil"
          onClick={handleClick}
        />
        <SidebarItem
          icon={<span className="text-orange-400">✎</span>}
          label="Sobre nosotros"
          onClick={() => setActiveComponent('About')} 
        />
        <SidebarItem
          icon={<span className="text-orange-400">📣</span>}
          label="Publicaciones"
          onClick={() => setActiveComponent('PostFeed')}
        />
        <SidebarItem
          icon={<span className="text-orange-400">🏠</span>}
          label="Mis publicaciones"
          onClick={() => setActiveComponent('MyPosts')}
        />
        <SidebarItem
          icon={<span className="text-orange-400">🤜🤛</span>}
          label="Personas"
          onClick={() => setActiveComponent('People')}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
