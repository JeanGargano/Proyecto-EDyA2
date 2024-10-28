// UserInfo.js
import { useEffect, useState } from 'react';
import InfoUserLeft from './InfoUserLeft';
import Form from './form';
import { fetchUserInfo } from './service/UserInfService';
import Navbar from '../Navbar';

function UserInfo() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [profesion, setProfesion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    const [UserInfo, setUserInfo] = useState({});

    const actualizarNombreCompleto = (nombre) => setNombreCompleto(nombre);
    const actualizarProfesion = (profesion) => setProfesion(profesion);

    useEffect(() => {
        const obtenerInformacionUsuario = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo(userInfo);
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
        <>
        <Navbar 
            URI_PICTURE_PROFILE={URI_PICTURE_PROFILE}
            nombreCompleto={nombreCompleto}
        />
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#182637] shadow-lg p-4">
            <div className="flex gap-10 w-full md:w-[85%]">
                <InfoUserLeft nombreCompleto={nombreCompleto} profesion={profesion} imagenPerfil={imagenPerfil} />
                <Form
                    onActualizarNombre={actualizarNombreCompleto}
                    onActualizarProfesion={actualizarProfesion}
                    setEmail={setEmail}
                    setTelefono={setTelefono}
                    setUbicacion={setUbicacion}
                    userInfo={UserInfo}
                />
            </div>
        </div>
        </>
    );
}

export default UserInfo;
