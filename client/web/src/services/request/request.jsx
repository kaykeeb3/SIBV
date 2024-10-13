import { api } from "../../lib/api";

export const RequestService = {
  // Método para buscar todas as requisições
  async getAllRequests() {
    try {
      const response = await api.get("/loans");
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar as requisições:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível buscar as requisições.");
    }
  },

  // Método para buscar uma requisição por ID
  async getRequestById(requestId) {
    try {
      const response = await api.get(`/loans/${requestId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao buscar a requisição de ID ${requestId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível buscar a requisição de ID ${requestId}.`
      );
    }
  },

  // Método para criar uma nova requisição
  async createRequest(requestData) {
    try {
      const response = await api.post("/loans", requestData);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao criar a requisição:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível criar a requisição.");
    }
  },

  // Método para atualizar uma requisição existente
  async updateRequest(requestId, requestData) {
    try {
      const response = await api.put(`/loans/${requestId}`, requestData);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar a requisição de ID ${requestId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível atualizar a requisição de ID ${requestId}.`
      );
    }
  },

  // Método para deletar uma requisição
  async deleteRequest(requestId) {
    try {
      const response = await api.delete(`/loans/${requestId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao deletar a requisição de ID ${requestId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível deletar a requisição de ID ${requestId}.`
      );
    }
  },
};
