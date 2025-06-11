// SOUBOR: src/App.jsx
// ----------------------------------------------------
// OPRAVENÁ VERZE: Routa pro detail scénáře je přesunuta na správné místo,
// mimo vnořenou administrátorskou sekci.

import { Routes, Route } from 'react-router-dom';

// Importy komponent pro veřejné stránky
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Importy komponent pro chráněné (privátní) stránky
import DashboardPage from './pages/DashboardPage';
import ScenarioDetailPage from './pages/ScenarioDetailPage'; // Ujistěte se, že tento import máte
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
      <h1>Kybernetický Polygon</h1>
      <Routes>
        {/* === VEŘEJNÉ ROUTY === */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* === CHRÁNĚNÉ ROUTY PRO VŠECHNY PŘIHLÁŠENÉ === */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />

        {/* ZDE JE SPRÁVNÉ UMÍSTĚNÍ PRO DETAIL SCÉNÁŘE */}
        {/* Je na stejné úrovni jako dashboard, není vnořená pod /admin */}
        <Route 
          path="/scenario/:scenarioId"
          element={
            <PrivateRoute>
              <ScenarioDetailPage />
            </PrivateRoute>
          }
        />

        {/* === CHRÁNĚNÁ SEKCE POUZE PRO ADMINY === */}
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
          <Route path="manuals" element={<ManualsAdminPage />} />
          <Route path="vms" element={<VmsAdminPage />} />
          <Route path="scenarios" element={<ScenariosAdminPage />} />
          <Route path="assignments" element={<AssignmentsAdminPage />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
