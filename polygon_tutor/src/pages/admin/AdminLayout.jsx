// SOUBOR 2: Aktualizujte soubor src/pages/admin/AdminLayout.jsx
// -------------------------------------------------------------
// Přidáme odkaz na novou stránku do navigačního menu administrace.

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            <h2>Admin Panel</h2>
            <nav>
                <Link to="/admin">Přehled</Link> |{' '}
                <Link to="/admin/manuals">Návody</Link> |{' '}
                <Link to="/admin/vms">VM</Link> |{' '}
                <Link to="/admin/scenarios">Scénáře</Link> |{' '}
                <Link to="/admin/assignments">Přiřazení</Link> {/* <-- PŘIDÁNO */}
            </nav>
            <hr />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
