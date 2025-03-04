import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5000/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Asegurar que el token esté aquí
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Token inválido o expirado");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token"); // Limpiar token si es inválido
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } else {
      alert(data.error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
