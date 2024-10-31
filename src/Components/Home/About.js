import React from 'react'

const About = () => {
    const constants = {
        "proyecto": "Foro Web",
        "desarrolladores": [
            "Angel del Castillo",
            "Jean Alfred Gargano",
            "Juan Esteban Salazar"
        ],
        "descripcion": "Este proyecto, desarrollado en el curso de Estructuras de Datos y Algoritmos 2,\nconsiste en un foro web de uso libre donde los usuarios pueden registrarse,\ncrear publicaciones y participar en discusiones sobre diversos temas.",
        "tecnologias": {
            "backend": {
                "Express.js": "Un framework web para Node.js que simplifica la creación de aplicaciones y servicios, facilitando el manejo de rutas y middleware.",
                "Docker": "Utilizado para crear contenedores que garantizan que el entorno de desarrollo y producción sean consistentes, facilitando la implementación y escalabilidad de la aplicación.",
                "MongoDB": "Una base de datos NoSQL que almacena los datos en formato JSON, permitiendo un manejo flexible y escalable de la información del foro.",
                "Firebase": "Proporciona servicios de autenticación y almacenamiento en tiempo real, mejorando la seguridad y la experiencia del usuario al interactuar con el foro."
            },
            "frontend": {
                "React": "Una biblioteca de JavaScript para construir interfaces de usuario interactivas, permitiendo una experiencia fluida y responsiva en la aplicación del foro.",
                "Tailwind CSS": "Un framework CSS que facilita la creación de diseños modernos y personalizados, permitiendo un desarrollo rápido y coherente de estilos."
            }
        }
    };

    return (
        <div className='bg-[#182637] h-screen flex flex-col justify-center items-center text-center p-6 mt-5'>
            <h1 className='text-5xl text-white mb-4'>Sobre el Proyecto</h1>
            <p className='text-lg text-gray-300 mb-6'>
               <span className='font-bold'> PROYECTO DESARROLLADO POR:</span> {constants.desarrolladores.join(', ')}
            </p>
            <h2 className='text-2xl text-white mb-2'>Descripción</h2>
            <p className='text-gray-300 mb-6' style={{ whiteSpace: 'pre-line', lineHeight: '1' }}>{constants.descripcion}</p>

            <div className='w-full max-w-md mb-8'>
                <h2 className='text-xl text-white mb-2'>Backend</h2>
                <ol className='list-decimal list-inside text-gray-300'>
                    {Object.entries(constants.tecnologias.backend).map(([key, description]) => (
                        <li key={key} className='mb-2'>
                            <span className='font-semibold'>{key}:</span> {description}
                        </li>
                    ))}
                </ol>
            </div>

            <div className='w-full max-w-md'>
                <h2 className='text-xl text-white mb-2'>Frontend</h2>
                <ul className='list-disc list-inside text-gray-300'>
                    {Object.entries(constants.tecnologias.frontend).map(([key, description]) => (
                        <li key={key} className='mb-2'>
                            <span className='font-semibold'>{key}:</span> {description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default About