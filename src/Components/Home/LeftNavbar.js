import React from 'react';
import '../../Stylesheet/Home/LeftNavbar.css';
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, label }) => (
  <div className="bg-[#212831] SelectedItem flex items-center space-x-2 p-2 w-full rounded-md cursor-pointer">
    {icon}
    <span className="text-white">{label}</span>
  </div>
);

const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/info');
  }
  return (
    <div className="bg-[#212831] w-64 h-screen p-4 fixed left-0 top-0 mt-16">  {/* Ajuste aquí */}
      {/* User Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img src='/media/picture/images.png' alt="User name" className="w-12 h-12 rounded-full" onClick={handleClick} />
        <span className="text-white text-lg font-semibold">User name</span>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        <SidebarItem 
          icon={<span className="text-orange-400">?</span>} 
          label="Preguntas" 
        />
        <SidebarItem 
          icon={<span className="text-orange-400">❤</span>} 
          label="Respuestas favoritas" 
        />
        <SidebarItem 
          icon={<span className="text-orange-400">📣</span>} 
          label="Mis publicaciones" 
        />
        <SidebarItem 
          icon={<span className="text-orange-400">🔖</span>} 
          label="Preguntas favoritas" 
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
