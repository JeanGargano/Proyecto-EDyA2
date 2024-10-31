import '../../Stylesheet/Home/output.css';
import Navbar from '../Navbar.js';
import LeftSidebar from './LeftNavbar.js';
import PostFeed from './Post/PostFeed.js';
import { useAuth } from '../../Context/AuthProvider.js';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../UserInfo/service/UserInfService';
import About from './About.jsx';
import People from './People.jsx';
import ButtonChat from './ButtonChat.js';

function Home() {
  const { user } = useAuth();
  console.log("Estas en Home", user);
  
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [profesion, setProfesion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState('');
  
  const URI_PICTURE_PROFILE = imagenPerfil ? `http://localhost:8000/${imagenPerfil}` : '';
  const [activeComponent, setActiveComponent] = useState('PostFeed');
  const [componentKey, setComponentKey] = useState(0); // Estado para forzar el reinicio

  useEffect(() => {
    const obtenerInformacionUsuario = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        const { fullname, profession, email, phone, location, profileImage } = userInfo;
        setNombreCompleto(fullname);
        setProfesion(profession);
        setEmail(email);
        setTelefono(phone);
        setUbicacion(location);
        setImagenPerfil(profileImage);
      }
    };
    obtenerInformacionUsuario();
  }, []);

  const renderActiveComponent = () => {
    if (activeComponent === 'PostFeed') {
      return <PostFeed key={componentKey} URI_PICTURE_PROFILE={URI_PICTURE_PROFILE} depends={false} />;
    } else if (activeComponent === 'About') {
      return <About key={componentKey} />;
    } else if (activeComponent === 'MyPosts') {
      return <PostFeed key={componentKey} URI_PICTURE_PROFILE={URI_PICTURE_PROFILE} depends={true} />;
    } else if (activeComponent === 'People') {
      return <People key={componentKey} />;
    }
  };

  // Función para cambiar el componente y forzar el reinicio
  const changeComponent = (component) => {
    setActiveComponent(component);
    setComponentKey(prevKey => prevKey + 1); // Aumentar la clave para forzar un nuevo render
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="fixed top-0 left-0 w-full z-50">
          <Navbar 
            URI_PICTURE_PROFILE={URI_PICTURE_PROFILE}
            nombreCompleto={nombreCompleto}
          />
        </nav>
        
        <div className="contenedor-feed pt-16 flex">
          <LeftSidebar 
            nombreCompleto={nombreCompleto}
            URI={URI_PICTURE_PROFILE}
            setActiveComponent={changeComponent} // Cambia la función pasada
          />
          <div className="w-full flex-1">
            {renderActiveComponent()}
          </div>
        </div>
        <div>
          <ButtonChat/>
        </div>
      </header>
    </div>
  );
}

export default Home;
