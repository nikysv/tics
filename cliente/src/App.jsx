import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Dashboard from "./views/Dashboard";
import Indexar from "./views/Indexar";
import VistaDocumento from "./views/VistaDocumento"; // Importamos la vista de documentos
import MisLotes from "./components/lotes/MisLotes";
import PerfilUsuario from "./components/user/UserView";
import Login from "./components/login/Login";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Routes>
            {/* Rutas protegidas */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/indexar" element={<ProtectedRoute><Indexar /></ProtectedRoute>} />
            <Route path="/mis-lotes" element={<ProtectedRoute><MisLotes /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>} />
            <Route path="/indexar/documento/:titulo" element={<ProtectedRoute><VistaDocumento /></ProtectedRoute>} />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<p>Saliendo...</p>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
