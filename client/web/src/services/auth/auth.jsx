import { api } from "../../lib/api";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async (credentials, onLogin) => {
  try {
    const data = await loginUser(credentials);
    const token = data.token;

    localStorage.setItem("token", token);

    // Remove o token após 30 minutos (1800000ms)
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 1800000);

    onLogin(token);
  } catch (error) {
    throw error;
  }
};
