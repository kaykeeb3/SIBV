import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index";
import { Login } from "./pages/auth/login";
import { Header } from "./components/header";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null); // Limpa o estado do usuário
  };

  return (
    <div className="pb-8">
      <Header isLoginPage={!token} onLogout={handleLogout} user={user} />
      {token ? (
        <RouterProvider router={Router} />
      ) : (
        <Login onLogin={handleLogin} setUser={setUser} />
      )}
    </div>
  );
}
