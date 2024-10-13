import { api } from "../../lib/api";

export const EquipmentService = {
  async getAllEquipments() {
    try {
      const response = await api.get("/equipments");
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar os equipamentos:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível buscar os equipamentos.");
    }
  },

  async getEquipmentById(equipmentId) {
    try {
      const response = await api.get(`/equipments/${equipmentId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao buscar o equipamento de ID ${equipmentId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível buscar o equipamento de ID ${equipmentId}.`
      );
    }
  },

  async createEquipment(equipmentData) {
    try {
      const response = await api.post("/equipments", equipmentData);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao criar o equipamento:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível criar o equipamento.");
    }
  },

  async updateEquipment(equipmentId, equipmentData) {
    try {
      const response = await api.put(
        `/equipments/${equipmentId}`,
        equipmentData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar o equipamento de ID ${equipmentId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível atualizar o equipamento de ID ${equipmentId}.`
      );
    }
  },

  async deleteEquipment(equipmentId) {
    try {
      const response = await api.delete(`/equipments/${equipmentId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao deletar o equipamento de ID ${equipmentId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível deletar o equipamento de ID ${equipmentId}.`
      );
    }
  },
};
