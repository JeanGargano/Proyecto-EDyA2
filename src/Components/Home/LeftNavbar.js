import React from 'react';
import '../../Stylesheet/Home/LeftNavbar.css';
import { useNavigate } from "react-router-dom";
import Chat from './Chat';
import ButtonChat from './ButtonChat';

const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full px-6 py-2 border rounded-lg border-orange-600  font-bold transform hover:-translate-y-1 transition duration-400 hover:underline decoration-white hover:bg-orange-800 flex items-center justify-start"
  >{icon}
    <span className="text-white">{label}</span>
  </button>
);

const LeftNavbar = ({ setActiveComponent }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveComponent('Profile');
    navigate('/info');
  };

  return (
    <div className="w-64 h-screen p-4 bg-gray-900 fixed left-0 top-0 mt-16 hidden md:block">
      <div className="space-y-4 pt-8 text-justify">
        <SidebarItem
          icon={<span className="text-orange-400">🙋 </span>}
          label="Mi Perfil"
          onClick={handleClick}
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
        <SidebarItem
          icon={<span className="text-orange-400">✎</span>}
          label="Sobre el Proyecto"
          onClick={() => setActiveComponent('About')}
        />
      </div>
      <div>
        <ButtonChat />
      </div>
    </div>
  );
};

export default LeftNavbar;
