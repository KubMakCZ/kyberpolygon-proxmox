// src/pages/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user, logoutUser } = useAuth();

    return (
        <div>
            <h1>Vítej na hlavní stránce, {user.name}!</h1>
            <p>Tvůj email: {user.email}</p>
            <p>Tvoje role: {user.prefs.role}</p>
            <small>Tvuj proxmox: {user.prefs.proxmox_user}</small> <hr/>
            <button onClick={logoutUser}>Odhlásit se</button>
        </div>
    );
};

export default DashboardPage;