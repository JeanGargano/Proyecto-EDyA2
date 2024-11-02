// Home.js
import '../../Stylesheet/Home/output.css';
import Navbar from '../../Shared/Navbar.js';
import LeftNavbar from '../../Components/Home/LeftNavbar.js';
import PostFeed from '../../Components/Home/Post/PostFeed.js';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../../Components/UserInfo/service/UserInfService.js';
import About from '../../Components/Home/About.js';
import People from '../../Components/Home/People.js';
import Chat from '../../Components/Home/Chat.js';

function Home() {
  
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState('');
  
  const [activeComponent, setActiveComponent] = useState('PostFeed');

  useEffect(() => {
    const obtenerInformacionUsuario = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        const { fullname, profileImage } = userInfo;
        setNombreCompleto(fullname);
        setImagenPerfil(profileImage);
      }
    };
    obtenerInformacionUsuario();
  }, []);

  const renderActiveComponent = () => {
    if (activeComponent === 'PostFeed') {
      return <PostFeed URI_PICTURE_PROFILE={imagenPerfil} depends={false} />;
    } else if (activeComponent === 'About') {
      return <About />;
    } else if (activeComponent === 'MyPosts') {
      return <PostFeed URI_PICTURE_PROFILE={imagenPerfil} depends={true} />;
    } else if (activeComponent === 'People') {
      return <People />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Ajustamos el Navbar para ser fijo en la parte superior */}
        <nav className="fixed top-0 left-0 w-full z-50">
          <Navbar 
            URI_PICTURE_PROFILE={imagenPerfil}
            nombreCompleto={nombreCompleto}
          />
        </nav>
        
        {/* Agregamos un margen superior para que el contenido quede debajo del Navbar */}
        <div className="contenedor-feed pt-16 flex">
          <LeftNavbar 
            nombreCompleto={nombreCompleto}
            URI={imagenPerfil}
            setActiveComponent={setActiveComponent}
          />
          <div className="w-full flex-1">
            {renderActiveComponent()}
          </div>
        </div>
        <div>
          <Chat 
          userName = {nombreCompleto}
          />
        </div>
      </header>
    </div>
  );
}

export default Home;
