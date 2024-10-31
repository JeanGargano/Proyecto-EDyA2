// App.js

import { Routes, Route } from "react-router-dom";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import UserInfo from "../Page/UserInfo/UserInfo";
import { AuthProvider } from "../Context/AuthProvider";
import PrivateRoute from "../PrivateRouter/PrivateRouter"; // Componente para proteger rutas

export default function App() {
    return (
        <AuthProvider> {/* Proveedor de contexto de autenticación */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={
                    <PrivateRoute> {/* Rutas protegidas envueltas en PrivateRoute */}
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/info" element={
                    <PrivateRoute> {/* Protegemos la ruta UserInfo también */}
                        <UserInfo />
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}
