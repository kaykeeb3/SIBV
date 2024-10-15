import { api } from "../../lib/api";

const handleApiCall = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar os dados de ${endpoint}:`,
      error.response ? error.response.data : error
    );
    throw new Error(`Não foi possível buscar os dados de ${endpoint}.`);
  }
};

export const HomeService = {
  // Método para buscar todas as requisições
  getAllRequests() {
    return handleApiCall("/loans");
  },

  // Método para buscar todos os livros
  getAllBooks() {
    return handleApiCall("/books");
  },

  // Método para buscar todos os equipamentos
  getAllEquipments() {
    return handleApiCall("/equipments");
  },

  // Método para buscar todos os agendamentos
  getAllSchedules() {
    return handleApiCall("/schedules");
  },
};
