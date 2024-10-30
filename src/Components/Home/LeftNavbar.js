import React from 'react';
import '../../Stylesheet/Home/LeftNavbar.css';
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="bg-[#212831] SelectedItem flex items-center space-x-2 p-2 w-full rounded-md cursor-pointer">
    {icon}
    <span className="text-white">{label}</span>
  </div>
);

const LeftSidebar = ({ nombreCompleto, URI, setActiveComponent }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/info');
  }

  return (
    <div className="bg-[#212831] w-64 h-screen p-4 fixed left-0 top-0 mt-16 hidden md:block">
      <div className="space-y-4">
        <SidebarItem
          icon={<span className="text-orange-400">?</span>}
          label="Mi Perfil"
          onClick={handleClick}
        />
        <SidebarItem
          icon={<span className="text-orange-400">❤</span>}
          label="Sobre nosotros"
          onClick={() => setActiveComponent('About')} 
        />
        <SidebarItem
          icon={<span className="text-orange-400">📣</span>}
          label="Publicaciones"
          onClick={() => setActiveComponent('PostFeed')}
        />
        <SidebarItem
          icon={<span className="text-orange-400">📣</span>}
          label="Mis publicaciones"
          onClick={() => setActiveComponent('MyPosts')}
        />
        <SidebarItem
          icon={<span className="text-orange-400">🔖</span>}
          label="Personas"
          onClick={() => setActiveComponent('People')}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
