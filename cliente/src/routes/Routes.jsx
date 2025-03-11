import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute";
import Dashboard from "../views/Dashboard";
import Indexar from "../views/Indexar";
import VistaDocumento from "../views/VistaDocumento";
import MisLotes from "../views/Lotes";
//import MisLotes from "../components/lotes/MisLotes";
import PerfilUsuario from "../views/UserView";
import Login from "../views/Login";
import VerDocumento from "../views/VerDocumento";

const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/indexar", element: <Indexar /> },
  { path: "/lotes", element: <MisLotes /> },
  { path: "/perfil", element: <PerfilUsuario /> },
  { path: "/indexar/documento/:docId", element: <VistaDocumento /> }, // Changed from :id to :docId
  { path: "/ver/documento/:docId", element: <VerDocumento /> },
];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <p>Saliendo...</p> },
];

const AppRoutes = () => (
  <Routes>
    {privateRoutes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={<ProtectedRoute>{element}</ProtectedRoute>}
      />
    ))}
    {publicRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRoutes;
