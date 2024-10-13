import { useState, useEffect } from "react";
import { BookTable } from "./_components/book-table";
import { BookModal } from "./_components/book-modal";
import { FilterDropdown } from "./_components/filter-dropdown";
import { bookService } from "../../services/book/book";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ quantity: 1, number: 0 });
  const [errors, setErrors] = useState({});
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Todos");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getAllBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Erro ao carregar os livros:", error);
        setErrors({ general: ["Erro ao carregar os livros."] });
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (category === "Todos") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.gender && book.gender.toLowerCase() === category.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  }, [category, books]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setFormData({ ...item, quantity: item.quantity, number: item.number });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setErrors({});
  };

  const handleBookUpdate = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setFilteredBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este livro?"
    );
    if (confirmDelete) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
      setFilteredBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success("Livro excluído com sucesso!"); // Mensagem de sucesso
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FilterDropdown
        isOpen={isOpen}
        toggleDropdown={() => setIsOpen((prev) => !prev)}
        setCategory={setCategory}
      />
      <BookTable
        data={filteredBooks}
        onOpenModal={handleOpenModal}
        loading={loading}
        handleDelete={handleDelete}
      />
      {modalOpen && selectedItem && (
        <BookModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onClose={handleCloseModal}
          onUpdateBook={handleBookUpdate}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
