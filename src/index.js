import React from 'react';
import ReactDOM from 'react-dom/client';
import './Stylesheet/Home/index.css';
import Home from './Components/Home/Home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login.js';
import UserInfo from './Components/UserInfo/UserInfo.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de Login */}
        <Route path="/home" element={<Home />} /> {/* Página principal */}
        <Route path="/info" element={<UserInfo />} /> {/* Página principal */}
      </Routes>
    </Router>
  </React.StrictMode>
);
