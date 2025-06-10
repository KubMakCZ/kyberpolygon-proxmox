// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Pokud uživatel není přihlášen, přesměruj na login
        return <Navigate to="/login" />;
    }

    // Pokud je přihlášen, zobraz obsah stránky
    return children;
};

export default PrivateRoute;