import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index";
import { Login } from "./pages/auth/login";
import { Header } from "./components/header";

export function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <div className="pb-8">
      <Header isLoginPage={!token} onLogout={handleLogout} />
      {token ? (
        <RouterProvider router={Router} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
