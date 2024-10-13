import { useState, useEffect } from "react";
import { EquipmentTable } from "./_components/equipment-table";
import { EquipmentModal } from "./_components/equipment-modal";
import { FilterDropdown } from "./_components/filter-dropdown";
import { EquipmentService } from "../../services/equipment/equipment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Equipment() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ quantity: 1 });
  const [errors, setErrors] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Todos");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true);
        const data = await EquipmentService.getAllEquipments();
        setEquipments(data);
        setFilteredEquipments(data);
      } catch (error) {
        console.error("Erro ao carregar os equipamentos:", error);
        setErrors({ general: ["Erro ao carregar os equipamentos."] });
      } finally {
        setLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  useEffect(() => {
    if (category === "Todos") {
      setFilteredEquipments(equipments);
    } else {
      const filtered = equipments.filter(
        (equipment) =>
          equipment.type && // Filtrar com base no tipo
          equipment.type.toLowerCase() === category.toLowerCase()
      );
      setFilteredEquipments(filtered);
    }
  }, [category, equipments]);

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

  const handleEquipmentUpdate = (updatedEquipment) => {
    setEquipments((prev) =>
      prev.map((equipment) =>
        equipment.id === updatedEquipment.id ? updatedEquipment : equipment
      )
    );
    setFilteredEquipments((prev) =>
      prev.map((equipment) =>
        equipment.id === updatedEquipment.id ? updatedEquipment : equipment
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este equipamento?"
    );
    if (confirmDelete) {
      setEquipments((prev) => prev.filter((equipment) => equipment.id !== id));
      setFilteredEquipments((prev) =>
        prev.filter((equipment) => equipment.id !== id)
      );
      toast.success("Equipamento excluído com sucesso!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FilterDropdown
        isOpen={isOpen}
        toggleDropdown={() => setIsOpen((prev) => !prev)}
        setCategory={(category) => {
          setCategory(category);
          setIsOpen(false); // Fecha o dropdown ao filtrar
        }}
      />
      <EquipmentTable
        data={filteredEquipments}
        onOpenModal={handleOpenModal}
        loading={loading}
        onDelete={handleDelete}
      />
      {modalOpen && selectedItem && (
        <EquipmentModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onClose={handleCloseModal}
          onUpdateEquipment={handleEquipmentUpdate}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
