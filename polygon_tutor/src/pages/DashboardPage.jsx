// SOUBOR: src/pages/DashboardPage.jsx
// ----------------------------------------------------
// Přidáno podmíněné zobrazení tlačítka pro přechod do admin panelu.

import React from 'react';
import { Link } from 'react-router-dom'; // <-- KROK 1: Přidáme import komponenty Link
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user, logoutUser } = useAuth();

    // Pokud z nějakého důvodu user ještě není načtený, zobrazíme prázdnou stránku.
    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Vítej na hlavní stránce, {user.name}!</h1>
            <p>Tvůj email: {user.email}</p>
            <p>Tvoje role: {user.prefs.role || 'student'}</p> {/* Zobrazí roli, nebo "student" jako výchozí */}
            
            <hr style={{ margin: '1em 0' }} />

            {/* KROK 2: Přidáme podmíněné zobrazení pro admina */}
            {user.prefs.role === 'admin' && (
                <div style={{ marginBottom: '1em' }}>
                    <Link to="/admin">
                        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', cursor: 'pointer' }}>
                            Přejít do Admin Panelu
                        </button>
                    </Link>
                </div>
            )}
            
            <button onClick={logoutUser}>Odhlásit se</button>
        </div>
    );
};

export default DashboardPage;
