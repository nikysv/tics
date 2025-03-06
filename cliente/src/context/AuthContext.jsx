import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (!user) fetchUserData(storedToken); // 🔹 Solo llama si no hay usuario cargado
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/users/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Token inválido o expirado");

      const data = await res.json();
      setUser(data);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error desconocido al iniciar sesión");
      }

      setToken(data.token);
      sessionStorage.setItem("token", data.token);
      await fetchUserData(data.token);  // 🔹 Esperar a que se cargue la data del usuario

      return { success: true };  // Retornamos éxito
    } catch (error) {
      return { success: false, message: error.message }; // Retornamos el mensaje de error
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
