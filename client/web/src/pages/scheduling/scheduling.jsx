import { useState } from "react";
import { SchedulingTable } from "./_components/scheduling-table";
import { SchedulingModal } from "./_components/scheduling-modal";
import { FilterDropdown } from "./_components/filter-dropdown";

export function Scheduling() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    quantidade: 0,
    dataInicio: "",
    dataDevolucao: "",
    diaSemana: "",
  });
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("Todos");

  // Função para gerar dados de exemplo
  const generateData = () => {
    const daysOfWeek = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];

    const generatedData = [];
    for (let i = 1; i <= 100; i++) {
      const randomQuantity = Math.floor(Math.random() * 10) + 1; // Quantidade aleatória entre 1 e 10
      const randomStartDate = new Date(
        2024,
        8,
        Math.floor(Math.random() * 30) + 1
      ); // Data aleatória em setembro de 2024
      const randomEndDate = new Date(randomStartDate);
      randomEndDate.setDate(
        randomEndDate.getDate() + Math.floor(Math.random() * 10) + 1
      ); // Data de devolução aleatória (1 a 10 dias após a data de início)
      const diaSemana = daysOfWeek[randomStartDate.getDay()]; // Obtém o dia da semana da data de início

      generatedData.push({
        id: i,
        nomeResponsavel: `Responsável ${i}`,
        quantidade: randomQuantity,
        dataInicio: randomStartDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
        dataDevolucao: randomEndDate.toISOString().split("T")[0],
        diaSemana: diaSemana,
        status: i % 2 === 0 ? "Em uso" : "Disponível", // Alterna entre "Em uso" e "Disponível"
        propriedade: `Escola ${Math.floor(Math.random() * 5) + 1}`, // Aleatoriamente define uma escola
      });
    }

    return generatedData;
  };

  const data = generateData(); // Gera os dados ao inicializar o componente

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

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FilterDropdown
        isOpen={isOpen}
        setCategory={setCategory}
        category={category}
        toggleDropdown={() => setIsOpen((prev) => !prev)}
      />
      <SchedulingTable data={data} onOpenModal={handleOpenModal} />

      {modalOpen && selectedItem && (
        <SchedulingModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
