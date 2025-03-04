import React, { useState } from "react";
import RegisterModal from "../register/registermodal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    console.log("Intento de login con:", { email, password });
    setError(""); // Limpiar error si todo está bien
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <button
            className="text-blue-500 hover:underline"
            onClick={openRegisterModal}
          >
            Regístrate
          </button>
        </div>
      </div>

      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={closeRegisterModal}
        />
      )}
    </div>
  );
};

export default Login;
