import '../../Stylesheet/Login/Login.css';
import InfoUserLeft from './InfoUserLeft';
import Form from './form';
import { useState } from 'react';

function UserInfo() {

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [profesion, setProfesion] = useState('');

    // Función para actualizar el nombre completo
    const actualizarNombreCompleto = (nombre) => {
        setNombreCompleto(`${nombre} `);
    };
    const actualizarProfesion = (profesion) => {
        setProfesion(`${profesion} `);
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-[#182637] shadow-lg p-4">
            <div className="flex gap-10 w-[85%]">
                <InfoUserLeft nombreCompleto={nombreCompleto} profesion={profesion} />
                <Form onActualizarNombre={actualizarNombreCompleto} onActualizarProfesion={actualizarProfesion} />
            </div>
        </div>

    );
}



export default UserInfo;