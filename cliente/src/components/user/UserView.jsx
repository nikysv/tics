import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PerfilUsuario = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editando, setEditando] = useState({ nombre: false, correo: false });
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  // 🚀 Obtener datos del usuario desde el backend
  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5000/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setNuevoNombre(data.nombre);
          setNuevoCorreo(data.correo);
        })
        .catch((err) => console.error("Error obteniendo perfil:", err));
    }
  }, [token]);

  // 🚀 Actualizar datos del usuario en el backend
  const handleGuardar = async (campo) => {
    if (!nuevoNombre.trim() || !nuevoCorreo.trim()) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo }),
      });

      if (!res.ok) throw new Error("Error al actualizar el perfil.");

      setUserData({ ...userData, nombre: nuevoNombre, correo: nuevoCorreo });
      setEditando({ ...editando, [campo]: false });
      setMensaje("Perfil actualizado con éxito.");
    } catch (error) {
      setMensaje("Error al actualizar el perfil.");
    }
  };

  // Función para formatear la fecha como YY/MM/DD
  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const fechaObj = new Date(fecha);
    const year = fechaObj.getFullYear().toString(); // Año
    const month = (fechaObj.getMonth() + 1).toString().padStart(2, "0"); // Mes con 2 dígitos
    const day = fechaObj.getDate().toString().padStart(2, "0"); // Día con 2 dígitos
    return `${day}/${month}/${year}`; // Formato YY/MM/DD
  };

  if (!userData) return <p className="text-center">Cargando perfil...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Perfil de Usuario</h2>

      {mensaje && <p className="text-green-500 text-center mb-4">{mensaje}</p>}

      {/* Imagen de Perfil */}
      <div className="flex flex-col items-center">
        {userData.imagen ? (
          <img
            src={userData.imagen}
            alt="Perfil"
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-4xl">👤</span>
          </div>
        )}
        <button className="mt-2 text-blue-500 hover:underline">
          Cambiar Foto
        </button>
      </div>

      {/* Detalles del Usuario */}
      <div className="mt-6">
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Nombre</label>
          {editando.nombre ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                onClick={() => handleGuardar("nombre")}
              >
                Guardar
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{userData.nombre}</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setEditando({ ...editando, nombre: true })}
              >
                Editar
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Correo Electrónico
          </label>
          {editando.correo ? (
            <div className="flex gap-2">
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={nuevoCorreo}
                onChange={(e) => setNuevoCorreo(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                onClick={() => handleGuardar("correo")}
              >
                Guardar
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{userData.correo}</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setEditando({ ...editando, correo: true })}
              >
                Editar
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Fecha de Registro
          </label>
          <p>{formatearFecha(userData.fecha_registro)}</p>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={logout}
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilUsuario;
