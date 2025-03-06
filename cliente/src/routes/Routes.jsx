import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute";
import Dashboard from "../views/Dashboard";
import Indexar from "../views/Indexar";
import VistaDocumento from "../views/VistaDocumento";
import MisLotes from "../components/lotes/MisLotes";
import PerfilUsuario from "../views/UserView";
import Login from "../views/Login";

const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/indexar", element: <Indexar /> },
  { path: "/mis-lotes", element: <MisLotes /> },
  { path: "/perfil", element: <PerfilUsuario /> },
  { path: "/indexar/documento/:titulo", element: <VistaDocumento /> },
];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <p>Saliendo...</p> },
];

const AppRoutes = () => (
  <Routes>
    {privateRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
    ))}
    {publicRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRoutes;
