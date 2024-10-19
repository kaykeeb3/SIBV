import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index";
import { Login } from "./pages/auth/login";
import { Header } from "./components/header";
import { getProfile } from "./services/auth/auth";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Função para buscar o perfil do usuário
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile); // Atualiza o estado do usuário com o perfil retornado
        } catch (error) {
          console.error("Erro ao carregar perfil do usuário:", error);
          handleLogout(); // Faz logout caso haja erro ao carregar o perfil
        }
      }
    };

    fetchProfile();
  }, [token]);

  // Função chamada ao fazer login, salvando o token e atualizando o estado
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Função chamada ao fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null); // Limpa os dados do usuário ao sair
  };

  return (
    <div className="pb-8">
      {/* Exibe o header. Se o usuário não estiver logado (sem token), ajusta o estado de "isLoginPage" */}
      <Header isLoginPage={!token} onLogout={handleLogout} user={user} />

      {/* Exibe o roteador principal ou a página de login dependendo da presença do token */}
      {token ? (
        <RouterProvider router={Router} />
      ) : (
        <Login onLogin={handleLogin} setUser={setUser} />
      )}
    </div>
  );
}
