import '../../Stylesheet/Login/login1.css';
import Contenedor1 from './leftCont';
import Formulario from './form';
import { useState } from 'react';

function App() {

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [profesion, setProfesion] = useState('');

    // Función para actualizar el nombre completo
    const actualizarNombreCompleto = (nombre, apellido) => {
        setNombreCompleto(`${nombre} ${apellido}`);
    };
    const actualizarProfesion = (profesion) => {
        setProfesion(`${profesion} `);
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-[#182637] shadow-lg p-4">
            <div className="flex gap-10 w-[85%]">
                <Contenedor1 nombreCompleto={nombreCompleto} profesion={profesion} />
                <Formulario onActualizarNombre={actualizarNombreCompleto} onActualizarProfesion={actualizarProfesion} />
            </div>
        </div>

    );
}



export default App;