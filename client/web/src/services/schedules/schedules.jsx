import { api } from "../../lib/api";

export const SchedulesService = {
  // Método para buscar todos os agendamentos
  async getAllSchedules() {
    try {
      const response = await api.get("/schedules");
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar os agendamentos:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível buscar os agendamentos.");
    }
  },

  // Método para buscar um agendamento por ID
  async getScheduleById(scheduleId) {
    try {
      const response = await api.get(`/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao buscar o agendamento de ID ${scheduleId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível buscar o agendamento de ID ${scheduleId}.`
      );
    }
  },

  // Método para criar um novo agendamento
  async createSchedule(scheduleData) {
    try {
      const response = await api.post("/schedules", scheduleData);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao criar o agendamento:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível criar o agendamento.");
    }
  },

  // Método para atualizar um agendamento existente
  async updateSchedule(scheduleId, scheduleData) {
    try {
      const response = await api.put(`/schedules/${scheduleId}`, scheduleData);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar o agendamento de ID ${scheduleId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível atualizar o agendamento de ID ${scheduleId}.`
      );
    }
  },

  // Método para deletar um agendamento
  async deleteSchedule(scheduleId) {
    try {
      const response = await api.delete(`/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao deletar o agendamento de ID ${scheduleId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(
        `Não foi possível deletar o agendamento de ID ${scheduleId}.`
      );
    }
  },
};
