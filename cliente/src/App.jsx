import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AppRoutes from "./routes/Routes"; 

function App() {
  return (
    <AuthProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <AppRoutes />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
