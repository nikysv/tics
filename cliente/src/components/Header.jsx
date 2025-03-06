import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { handleLogout } = useAuth();

  const links = [
    { path: "/indexar", label: "Indexar" },
    { path: "/mis-lotes", label: "Mis Lotes" },
    { path: "/perfil", label: "Perfil" },
  ];

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/" aria-label="Ir al inicio">
          Sistema de Indexación
        </Link>
      </h1>
      <nav className="flex gap-4">
        {links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200"
          >
            {label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
