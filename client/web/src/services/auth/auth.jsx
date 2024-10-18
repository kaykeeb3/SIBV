import { api } from "../../lib/api";

// Função para fazer login do usuário
export const loginUser = async (credentials) => {
  try {
    console.log("Dados enviados para login:", credentials); // Para depuração
    const response = await api.post("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data; // Certifique-se de que isso inclui o token
  } catch (error) {
    console.error("Erro durante o login:", error.response?.data); // Para depuração
    throw error; // Relança o erro para tratamento no componente
  }
};

// Função para obter o perfil do usuário
export const getProfile = async (token) => {
  try {
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Desestrutura os dados do perfil do usuário
    const { name, role, profilePicture } = response.data;
    return { name, role, profilePicture };
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error.response?.data); // Para depuração
    throw error; // Relança o erro para tratamento no componente
  }
};

// Função que gerencia o login e armazena o token e o perfil do usuário
export const handleLogin = async (credentials, setUser) => {
  try {
    const data = await loginUser(credentials);
    const token = data.token;

    // Armazena o token no localStorage
    localStorage.setItem("token", token);

    // Remove o token após 30 minutos
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 1800000);

    // Obter perfil do usuário
    const profile = await getProfile(token);
    setUser(profile); // Define o perfil do usuário no estado

    return token; // Retorna o token para o componente
  } catch (error) {
    console.error("Erro no handleLogin:", error.message); // Para depuração
    throw error; // Relança o erro para tratamento no componente
  }
};
