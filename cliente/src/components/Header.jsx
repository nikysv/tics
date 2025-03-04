import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/">Sistema de Indexación</Link>
      </h1>
      <nav className="flex gap-4">
        <Link to="/indexar" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Indexar
        </Link>
        <Link to="/mis-lotes" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Mis Lotes
        </Link>
        <Link to="/perfil" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Perfil
        </Link>
        <Link to="/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
          Log Out
        </Link>
      </nav>
    </header>
  );
};

export default Header;
