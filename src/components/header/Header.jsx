import React from "react";

const Header = ({ onNavigate }) => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold" onClick={() => onNavigate("inicio")}>Sistema de Indexación</h1>
      <nav className="flex gap-4">
        <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200" onClick={() => onNavigate("indexar")}>
          Indexar
        </button>
        <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200" onClick={() => onNavigate("mis-lotes")}>
          Mis Lotes
        </button>
        <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200" onClick={() => onNavigate("perfil")}>
          Perfil
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700" onClick={() => onNavigate("logout")}>
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
