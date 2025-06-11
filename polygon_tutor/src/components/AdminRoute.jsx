// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // Pokud je uživatel přihlášen a má roli 'admin', zobraz obsah.
    // Přistupujeme k user.prefs.role, kde jsou uloženy vlastní atributy.
    if (user && user.prefs.role === 'admin') {
        return children;
    }

    // V ostatních případech (nepřihlášen nebo není admin) přesměruj na domovskou stránku.
    return <Navigate to="/" />;
};

export default AdminRoute;