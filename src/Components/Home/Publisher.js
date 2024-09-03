import React from 'react';
import '../../Stylesheet/Home/LeftNavbar.css';

export default function Publisher() {
  return (
    <div className="bg-[#182637] p-4 rounded-lg max-w-xl mx-auto mt-10">
      <div className="flex items-center space-x-4 mb-4">
      <img
          src='/media/picture/images.png'
          alt="User Avatar"
          className="rounded-full w-10 h-10 object-cover"
        />
        <input
          type="text"
          value={null}
          onChange={null}
          placeholder="¿Cuál es tu duda?"
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <hr className="border-gray-600 mb-4" />
      <div className="flex justify-around">
        <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16m-7 5h7M5 5l-1.6 1.6a1.5 1.5 0 000 2.12L5 10.4M4.6 5.4L3 7m16-2.6l1.6 1.6a1.5 1.5 0 010 2.12L19 10.4M20.4 5.4L22 7"
            />
          </svg>
          <span>Foto</span>
        </button>
        <button
          onClick={null}
          className="flex items-center space-x-2 text-orange-500 hover:text-orange-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Vaciar</span>
        </button>
        <button className="flex items-center space-x-2 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800">
          Publicar
        </button>
      </div>
    </div>
  );
}
