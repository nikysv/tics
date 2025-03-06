import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import EditableField from "../components/EditableField";

const PerfilUsuario = () => {
  const { userData, actualizarPerfil, mensaje, isLoading, logout } =
    useUserProfile();

  if (isLoading) return <p className="text-center">Cargando perfil...</p>;
  if (!userData)
    return (
      <p className="text-center text-red-500">No se pudo cargar el perfil.</p>
    );

  const formatearFecha = (fecha) => {
    if (!fecha) return "";

    const fechaObj = new Date(fecha);
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };

    return fechaObj.toLocaleDateString("es-ES", opciones); // Formato DD/MM/YYYY
  };

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

      {/* Datos del Usuario */}
      <div className="mt-6">
        <EditableField
          label="Nombre"
          value={userData.nombre}
          onSave={(nuevoNombre) =>
            actualizarPerfil(nuevoNombre, userData.correo)
          }
        />
        <EditableField
          label="Correo Electrónico"
          value={userData.correo}
          type="email"
          onSave={(nuevoCorreo) =>
            actualizarPerfil(userData.nombre, nuevoCorreo)
          }
        />

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Fecha de Registro
          </label>
          <p>{formatearFecha(userData.fecha_registro)}</p>
        </div>
      </div>

      <button
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilUsuario;
