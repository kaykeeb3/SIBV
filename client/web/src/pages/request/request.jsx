import { useEffect, useState } from "react";
import { RequestTable } from "./_components/request-table";
import { RequestModal } from "./_components/request-modal";
import { FilterDropdown } from "./_components/filter-dropdown";
import { RequestService } from "../../services/request/request";

export function Request() {
  const initialFormData = {
    name: "",
    seriesCourse: "",
    startDate: "",
    returnDate: "",
    bookId: null,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("Todos");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    const filteredRequests =
      category === "Todos"
        ? data
        : data.filter((request) => request.seriesCourse === category);
    setFilteredData(filteredRequests);
  }, [data, category]);

  const loadRequests = async () => {
    try {
      const requests = await RequestService.getAllRequests();
      const activeRequests = requests.filter((request) => !request.returned);
      const updatedRequests = updateRequestStatus(activeRequests);
      setData(updatedRequests);
      setFilteredData(updatedRequests); // Atualiza a tabela com todos os dados inicialmente
    } catch (error) {
      console.error("Error loading requests:", error);
      alert("Erro ao carregar as requisições.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = (requests) => {
    return requests.map((request) => {
      const returnDate = new Date(request.returnDate);
      const today = new Date();
      today.setHours(today.getHours() + 3);
      const dayDiff = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

      return {
        ...request,
        status:
          dayDiff < 0
            ? "Atrasado"
            : dayDiff === 0
            ? "Devolução Hoje"
            : `${dayDiff} dia(s) restante(s)`,
      };
    });
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      seriesCourse: item.seriesCourse,
      startDate: item.startDate,
      returnDate: item.returnDate,
      bookId: item.bookId,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setErrors({});
    setFormData(initialFormData);
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        await RequestService.updateRequest(selectedItem.id, formData);
        alert("Requisição atualizada com sucesso!");
      } else {
        await RequestService.createRequest(formData);
        alert("Requisição criada com sucesso!");
      }
      handleCloseModal();
      loadRequests();
    } catch (error) {
      console.error("Error saving request:", error);
      alert("Erro ao salvar a requisição.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta requisição?")) {
      try {
        await RequestService.deleteRequest(id);
        alert("Requisição deletada com sucesso!");
        loadRequests();
      } catch (error) {
        console.error("Error deleting request:", error);
        alert("Erro ao deletar a requisição.");
      }
    }
  };

  const handleReturn = async (requestId) => {
    try {
      const response = await RequestService.updateRequest(requestId, {
        returned: true,
      });
      if (response.returned) {
        alert("Livro devolvido com sucesso!");
        loadRequests();
      }
    } catch (error) {
      console.error("Erro ao devolver o livro:", error.message);
      alert("Erro ao devolver o livro.");
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
      <RequestTable
        data={filteredData}
        onOpenModal={handleOpenModal}
        handleDelete={handleDelete}
        handleReturn={handleReturn}
        loading={loading}
      />

      {modalOpen && (
        <RequestModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
