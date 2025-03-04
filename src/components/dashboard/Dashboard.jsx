import React, { useState } from "react";
import Header from "../header/Header";
import Inicio from "../Inicio/Inicio";
import Indexar from "../indexar/Indexar";
import MisLotes from "../lotes/MisLotes";
const Dashboard = () => {
  const [currentView, setCurrentView] = useState("inicio");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onNavigate={handleNavigation} />
      <main className="flex-1 p-6">
        {currentView === "inicio" && <Inicio />}
        {currentView === "indexar" && <Indexar />}
        {currentView === "mis-lotes" && <MisLotes />}
        {currentView === "perfil" && <p>Vista de Perfil</p>}
        {currentView === "logout" && <p>Saliendo...</p>}
      </main>
    </div>
  );
};

export default Dashboard;
