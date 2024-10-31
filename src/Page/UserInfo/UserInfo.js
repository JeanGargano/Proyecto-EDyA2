import { useEffect, useState } from 'react';
import InfoUserLeft from '../../Components/UserInfo/InfoUserLeft';
import Form from '../../Components/UserInfo/form';
import { fetchUserInfo } from '../../Components/UserInfo/service/UserInfService';
import Navbar from '../../Shared/Navbar';

function UserInfo() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [profesion, setProfesion] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    const [UserInfo, setUserInfo] = useState({});
    

    const actualizarNombreCompleto = (nombre) => setNombreCompleto(nombre);
    const actualizarProfesion = (profesion) => setProfesion(profesion);

    useEffect(() => {
        const obtenerInformacionUsuario = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo(userInfo);
                const { fullname, profession, profileImage } = userInfo;
                setNombreCompleto(fullname);
                setProfesion(profession);
                setImagenPerfil(profileImage);
            }
        };
    
        obtenerInformacionUsuario();
    }, []);

    const URI_PICTURE_PROFILE = imagenPerfil;

    return (
    <div className="pt-12">
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
                    userInfo={UserInfo}
                />
            </div>
        </div>
        </>
    </div>
    );
}

export default UserInfo;
