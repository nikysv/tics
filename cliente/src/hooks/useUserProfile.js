import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUserProfile = () => {
  const { token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5000/users/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch(() => {
          setUserData(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const actualizarPerfil = async (nuevoNombre, nuevoCorreo) => {
    if (!nuevoNombre.trim() || !nuevoCorreo.trim()) {
      setMensaje("Todos los campos son obligatorios.");
      return false;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/users/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo }),
      });

      if (!res.ok) throw new Error("Error al actualizar el perfil.");

      setUserData((prev) => ({ ...prev, nombre: nuevoNombre, correo: nuevoCorreo }));
      setMensaje("Perfil actualizado con éxito.");
      return true;
    } catch (error) {
      setMensaje("Error al actualizar el perfil.");
      return false;
    }
  };

  return { userData, actualizarPerfil, mensaje, isLoading, logout };
};
