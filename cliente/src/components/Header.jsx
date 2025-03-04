import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Para redirigir después del logout

  const handleLogout = () => {
    logout(); // Llamamos la función de logout del contexto
    navigate("/login"); // Redirigir al usuario después de cerrar sesión
  };

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
        <button
          onClick={handleLogout} // Llamamos `handleLogout` al hacer clic
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
