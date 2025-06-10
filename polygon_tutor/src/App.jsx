// SOUBOR: src/App.jsx
// ----------------------------------------------------
// Toto je hlavní komponenta aplikace, která definuje všechny cesty (routy)
// a stará se o zobrazení správných stránek na základě URL adresy.

import { Routes, Route } from 'react-router-dom';

// Importy komponent pro veřejné stránky
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Importy komponent pro chráněné (privátní) stránky
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Importy komponent pro administrátorskou sekci
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManualsAdminPage from './pages/admin/ManualsAdminPage';
import VmsAdminPage from './pages/admin/VmsAdminPage';
import ScenariosAdminPage from './pages/admin/ScenariosAdminPage';
import AssignmentsAdminPage from './pages/admin/AssignmentsAdminPage';

function App() {
  return (
    <div>
      {/* Hlavní nadpis aplikace, který bude vidět na všech stránkách */}
      <h1>Kybernetický Polygon</h1>
      
      {/* Definice všech dostupných cest v aplikaci */}
      <Routes>
        {/* === VEŘEJNÉ ROUTY === */}
        {/* Tyto stránky jsou dostupné komukoliv, i nepřihlášeným uživatelům. */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* === CHRÁNĚNÁ ROUTA PRO VŠECHNY PŘIHLÁŠENÉ === */}
        {/* Domovská stránka (dashboard) je obalená v PrivateRoute. */}
        {/* To znamená, že se na ni dostane jen přihlášený uživatel. */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />

        {/* === CHRÁNĚNÁ SEKCE POUZE PRO ADMINY === */}
        {/* Celá sekce /admin je obalená v AdminRoute, která kontroluje, */}
        {/* zda má uživatel roli 'admin'. Všechny vnořené routy dědí tuto ochranu. */}
        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Vnořené routy admin sekce, které se zobrazují uvnitř AdminLayout */}
          <Route index element={<AdminDashboard />} /> {/* Úvodní stránka adminu na /admin */}
          <Route path="manuals" element={<ManualsAdminPage />} /> {/* Stránka na /admin/manuals */}
          <Route path="vms" element={<VmsAdminPage />} /> {/* Stránka na /admin/vms */}
          <Route path="scenarios" element={<ScenariosAdminPage />} /> {/* Stránka na /admin/scenarios */}
          <Route path="assignments" element={<AssignmentsAdminPage />} /> {/* Stránka na /admin/assignments */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;