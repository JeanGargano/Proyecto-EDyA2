//Archivo para manejar rutas con react-router-dom

import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import UserInfo from "./Components/UserInfo/UserInfo";
import { AuthProvider } from "./Context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function App() {
    return (  // Agrega el return aquí
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/info" element={<UserInfo />} />
                <Route path="/*" element={<Navigate to="/"/>} />
            </Routes>
        
    );
}
