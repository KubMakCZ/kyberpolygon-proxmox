// SOUBOR 2: Aktualizujte soubor src/App.jsx
// ----------------------------------------------------
// Přidáme novou routu pro naši admin stránku se správou návodů.

import { Routes, Route } from 'react-router-dom';
// Importy ostatních stránek...
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

// Nové importy pro admin sekci
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManualsAdminPage from './pages/admin/ManualsAdminPage'; // <-- TENTO ŘÁDEK PŘIDEJTE

function App() {
  return (
    <div>
      <h1>Kybernetický Polygon</h1>
      <Routes>
        {/* Veřejné routy */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Chráněná routa pro přihlášené uživatele (studenty i adminy) */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />

        {/* Chráněná sekce POUZE pro adminy */}
        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Vnořené routy admin sekce */}
          <Route index element={<AdminDashboard />} />
          <Route path="manuals" element={<ManualsAdminPage />} /> {/* <-- TENTO ŘÁDEK PŘIDEJTE */}
          {/* Zde přidáme další podstránky, např. path="vms" */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
