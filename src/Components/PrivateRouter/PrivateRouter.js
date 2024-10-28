// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Incluye loading

    if (loading) return <div>Loading...</div>; // Asegura que la carga termine

    return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
