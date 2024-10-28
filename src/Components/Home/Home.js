import '../../Stylesheet/Home/output.css';
import Navbar from '../Navbar.js';
import LeftSidebar from './LeftNavbar.js';
import PostFeed from './Post/PostFeed.js';
import { useAuth } from '../../Context/AuthProvider.js';
import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../UserInfo/service/UserInfService';

function Home() {

  const {user} = useAuth()
  console.log("Estas en Home", user)
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [profesion, setProfesion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    
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
    const URI_PICTURE_PROFILE = imagenPerfil ? `http://localhost:8000/${imagenPerfil}` : '';

  
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Navbar 
            URI_PICTURE_PROFILE = {URI_PICTURE_PROFILE}
            nombreCompleto = {nombreCompleto}
          />
        </nav>
        <div className="contenedor-feed">
          <LeftSidebar 
            nombreCompleto={nombreCompleto}
            URI={URI_PICTURE_PROFILE}
          />
          <PostFeed 
            URI_PICTURE_PROFILE = {URI_PICTURE_PROFILE}
          />
        </div>
      </header>
    </div>
  );
}

export default Home;
