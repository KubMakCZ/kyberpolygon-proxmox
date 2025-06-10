// src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            <h2>Admin Panel</h2>
            <nav>
                <Link to="/admin">Přehled</Link> |{' '}
                <Link to="/admin/manuals">Správa Návodů</Link> |{' '}
                <Link to="/admin/vms">Správa VM</Link> |{' '}
                <Link to="/admin/scenarios">Správa Scénářů</Link>
            </nav>
            <hr />
            <main>
                {/* Zde se bude renderovat obsah podstránek */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;