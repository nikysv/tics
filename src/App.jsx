import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./views/Dashboard";
import Indexar from "./views/Indexar";
import MisLotes from "./components/lotes/MisLotes";
import PerfilUsuario from "./components/user/UserView";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/indexar/*" element={<Indexar />} />
          <Route path="/mis-lotes" element={<MisLotes />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/logout" element={<p>Saliendo...</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
