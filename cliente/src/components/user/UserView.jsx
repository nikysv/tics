import React, { useState } from "react";

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nombre: "Usuario Ejemplo",
    correo: "usuario@email.com",
    fechaRegistro: "10/03/2023",
  });

  const [editando, setEditando] = useState({ nombre: false, correo: false });
  const [nuevoNombre, setNuevoNombre] = useState(userData.nombre);
  const [nuevoCorreo, setNuevoCorreo] = useState(userData.correo);

  const handleGuardar = (campo) => {
    if (campo === "nombre") {
      setUserData({ ...userData, nombre: nuevoNombre });
    } else if (campo === "correo") {
      setUserData({ ...userData, correo: nuevoCorreo });
    }
    setEditando({ ...editando, [campo]: false });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Perfil de Usuario</h2>

      {/* Imagen de Perfil */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-4xl">👤</span>
        </div>
        <button className="mt-2 text-blue-500 hover:underline">Cambiar Foto</button>
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
              <button className="text-blue-500 hover:underline" onClick={() => setEditando({ ...editando, nombre: true })}>
                Editar
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Correo Electrónico</label>
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
              <button className="text-blue-500 hover:underline" onClick={() => setEditando({ ...editando, correo: true })}>
                Editar
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Fecha de Registro</label>
          <p>{userData.fechaRegistro}</p>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilUsuario;
