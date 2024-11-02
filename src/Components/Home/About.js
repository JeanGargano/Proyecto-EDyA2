import React from 'react';
import { constants } from './constants/index';
const About = () => {


    return (
        <div className='bg-[#182637] min-h-screen flex flex-col justify-center items-center   pb-10 mt-5 px-4'>
            <div className='w-full max-w-4xl text-center'>
            <h1 className='text-3xl md:text-5xl text-white mb-4 font-bold'>Sobre el Proyecto</h1>
            <p className='text-base md:text-lg text-gray-300 mb-6'>
                    <span className='font-bold'> PROYECTO DESARROLLADO POR:</span> {constants.desarrolladores.join(', ')}
                </p>

                <h2 className='text-xl md:text-2xl text-white font-bold mb-2 underline'>Descripción</h2>
                <p className='text-gray-300 mb-6 text-left' style={{ whiteSpace: 'pre-line' }}>{constants.descripcion}</p>

                <div className='w-full max-w-3xl mb-8 flex flex-col md:flex-row items-center'>
                    <img src='/media/picture/asetback.jpg' alt='Backend' className='w-[15rem] h-[15rem] rounded-3xl mr-0 md:mr-8 mb-4 md:mb-0' />
                    <div>
                    <h2 className='text-lg md:text-xl text-white text-center mb-2 underline font-bold'>Backend</h2>
                    <ul className='list-disc list-inside text-gray-300 text-justify'>
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
