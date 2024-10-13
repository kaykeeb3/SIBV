import { useState, useEffect } from "react";
import { SchedulingTable } from "./_components/scheduling-table";
import { SchedulingModal } from "./_components/scheduling-modal";
import { FilterDropdown } from "./_components/filter-dropdown";
import { SchedulesService } from "../../services/schedules/schedules";

export function Scheduling() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    startDate: "",
    returnDate: "",
    weekDay: "",
    equipmentId: null,
    returned: false,
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("Todos");
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await SchedulesService.getAllSchedules();
        const activeSchedules = data.filter((schedule) => !schedule.returned);
        setSchedules(activeSchedules);
        setFilteredSchedules(activeSchedules); // Inicializa com todos os ativos
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    if (category === "Todos") {
      setFilteredSchedules(schedules);
    } else {
      setFilteredSchedules(
        schedules.filter((schedule) => schedule.type === category)
      );
    }
  }, [category, schedules]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setErrors({});
  };

  const handleEditSchedule = async (updatedData) => {
    if (!selectedItem || !selectedItem.id) {
      console.error("ID do agendamento não encontrado");
      return;
    }

    try {
      const updatedSchedule = await SchedulesService.updateSchedule(
        selectedItem.id,
        updatedData
      );
      const updatedSchedules = schedules
        .map((schedule) =>
          schedule.id === selectedItem.id ? updatedSchedule : schedule
        )
        .filter((schedule) => !schedule.returned);

      setSchedules(updatedSchedules);
      setFilteredSchedules(updatedSchedules); // Atualiza os agendamentos filtrados
      alert("Agendamento atualizado com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar o agendamento:", error);
      alert("Erro ao atualizar o agendamento.");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("ID do agendamento não fornecido");
      return;
    }

    try {
      await SchedulesService.deleteSchedule(id);
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id && !schedule.returned)
      );
      setFilteredSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id && !schedule.returned)
      ); // Atualiza os agendamentos filtrados
      alert("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o agendamento:", error);
      alert("Erro ao excluir o agendamento.");
    }
  };

  const handleReturn = async (id) => {
    if (!id) {
      console.error("ID do agendamento não fornecido");
      return;
    }

    try {
      const updatedSchedule = await SchedulesService.updateSchedule(id, {
        returned: true,
      });
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id && !schedule.returned)
      );
      setFilteredSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id && !schedule.returned)
      ); // Atualiza os agendamentos filtrados
      alert("Equipamento devolvido com sucesso!");
    } catch (error) {
      console.error("Erro ao devolver equipamento:", error);
      alert("Erro ao devolver equipamento.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FilterDropdown
        isOpen={isOpen}
        setCategory={setCategory}
        category={category}
        toggleDropdown={() => setIsOpen((prev) => !prev)}
      />
      <SchedulingTable
        data={filteredSchedules}
        onOpenModal={handleOpenModal}
        handleDelete={handleDelete}
        handleReturn={handleReturn}
      />

      {modalOpen && selectedItem && (
        <SchedulingModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onClose={handleCloseModal}
          onEdit={handleEditSchedule}
        />
      )}
    </div>
  );
}
