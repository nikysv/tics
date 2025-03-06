import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Cargando...</p>; // Evita redirección hasta que termine la verificación
  }

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
