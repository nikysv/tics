import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RegisterModal from "../components/register/registermodal";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Nuevo estado para bloquear el botón
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      setLoading(false);
      return;
    }

    const response = await login(email, password);

    if (response.success) {
      navigate("/"); // Redirigir al Dashboard
    } else {
      setError(response.message); // Mostrar mensaje de error
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
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
            className={`w-full py-2 rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <button className="text-blue-500 hover:underline" onClick={() => setShowRegisterModal(true)}>
            Regístrate
          </button>
        </div>
      </div>

      {showRegisterModal && <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />}
    </div>
  );
};

export default Login;
