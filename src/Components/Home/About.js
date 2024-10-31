import React from 'react';

const About = () => {
    const constants = {
        "proyecto": "Foro Web",
        "desarrolladores": [
            "Angel del Castillo",
            "Jean Alfred Gargano",
            "Juan Esteban Salazar"
        ],
        "descripcion": "Este proyecto, desarrollado en el curso de Estructuras de Datos \ny Algoritmos 2, consiste en un foro web de uso libre donde los usuarios \npueden registrarse, crear publicaciones y participar en discusiones sobre diversos temas.",
        "tecnologias": {
            "backend": {
                "Express.js": "Un framework web para Node.js que simplifica la creación de aplicaciones y servicios, facilitando el manejo de rutas y middleware.",
                "Docker": "Utilizado para crear contenedores que garantizan que el entorno de desarrollo y producción sean consistentes, facilitando la implementación y escalabilidad de la aplicación.",
                "MongoDB": "Una base de datos NoSQL que almacena los datos en formato JSON, permitiendo un manejo flexible y escalable de la información del foro.",
                "Firebase": "Proporciona servicios de autenticación y almacenamiento en tiempo real, mejorando la seguridad y la experiencia del usuario al interactuar con el foro."
            },
            "frontend": {
                "React": "Una biblioteca de JavaScript para construir interfaces de usuario interactivas, permitiendo una experiencia fluida y responsiva en la aplicación del foro.",
                "Tailwind CSS": "Un framework CSS que facilita la creación de diseños modernos y personalizados, permitiendo un desarrollo rápido y coherente de estilos.",
                "CSS": "Un lenguaje de hojas de estilo que permite dar formato y diseño a documentos HTML, mejorando la apariencia visual y la experiencia de usuario en el foro.",
                "HTML": "El lenguaje de marcado estándar para crear y estructurar contenido en la web, permitiendo construir la estructura básica y organizar la información de manera efectiva."

            }
        },
        "github": "https://github.com/JeanGargano/Proyecto-EDyA2.git",
        "canva": "https://www.canva.com/design/DAGNv-RwjlI/vLDjnZM_OXW0efxMU-5u5Q/edit",
    };

    return (
        <div className='bg-[#182637] min-h-screen flex flex-col justify-center items-center   pb-10 mt-5 px-4'>
            <div className='w-full max-w-4xl text-center'>
                <h1 className='text-5xl text-white mb-4 under font-bold'>Sobre el Proyecto</h1>
                <p className='text-lg text-gray-300 mb-6'>
                    <span className='font-bold'> PROYECTO DESARROLLADO POR:</span> {constants.desarrolladores.join(', ')}
                </p>

                <h2 className='text-2xl text-white font-bold mb-2 text-center underline'>Descripción</h2>
                <p className='text-gray-300 mb-6 text-center' style={{ whiteSpace: 'pre-line', lineHeight: '1' }}>{constants.descripcion}</p>

                <div className='w-full max-w-3xl mb-8 flex flex-col md:flex-row items-center'>
                    <img src='/media/picture/asetback.jpg' alt='Backend' className='w-[15rem] h-[15rem] rounded-3xl mr-0 md:mr-8 mb-4 md:mb-0' />
                    <div>
                        <h2 className='text-xl text-white text-center mb-2 underline font-bold'>Backend</h2>
                        <ul className='list-disc list-inside text-justify text-gray-300'>
                            {Object.entries(constants.tecnologias.backend).map(([key, description]) => (
                                <li key={key} className='mb-2'>
                                    <span className='font-semibold'>{key}:</span> {description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='w-full max-w-3xl flex flex-col md:flex-row items-center'>
                    <div className=' text-justify'>
                        <h2 className='text-xl text-center text-white mb-2 underline font-bold'>Frontend</h2>
                        <ul className='list-disc list-inside text-gray-300 pr-5'>
                            {Object.entries(constants.tecnologias.frontend).map(([key, description]) => (
                                <li key={key} className='mb-2'>
                                    <span className='font-semibold'>{key}:</span> {description}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <img src='/media/picture/asetfront.jpg' alt='Frontend' className='w-[15rem] h-[15rem]  ml-0 md:ml-4 rounded-3xl mt-4 md:mt-0' />
                </div>
                <p className='text-lg text-justify pt-6 text-gray-300 mb-6'>
                    <span className='font-bold'>ENLACE A GITHUB:</span>
                    <a href={constants.github} target="_blank"  className='text-blue-400  pl-3 underline'>
                        {constants.github}
                    </a>
                </p>
                <p className='text-lg text-justify pt-6 text-gray-300 mb-6'>
                    <span className='font-bold'>ENLACE A PROPUESTA GRÁFICA:</span>
                    <a href={constants.canva} target="_blank"  className='text-blue-400  pl-3 underline'>
                    https://www.canva.com/design
                    </a>
                </p>
                <p className='text-lg text-justify pt-6 text-gray-300 mb-6'>
                    <span className='font-bold'>ENLACE A DEPLOY:</span>
                    <a href={constants.github} target="_blank"  className='text-blue-400  pl-3 underline'>
                        {constants.github}
                    </a>
                </p>

            </div>
        </div>
    );
}

export default About;
