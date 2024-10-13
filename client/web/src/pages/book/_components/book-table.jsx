import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { motion } from "framer-motion";

export function BookTable({ data, onOpenModal, loading, handleDelete }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setBooks(data);
  }, [data]);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredBooks = books.filter((book) => {
    return (
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.id.toString().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.number.toString().includes(searchTerm) ||
      book.quantity.toString().includes(searchTerm)
    );
  });

  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar por nome, ID, autor, número ou quantidade"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>

      {loading ? (
        <div className="p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
        </div>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>Nenhum livro encontrado para o gênero selecionado.</p>
            </div>
          ) : (
            <motion.table
              className="min-w-full divide-y divide-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-gray-800 text-white">
                <tr>
                  {[
                    "ID",
                    "Nome",
                    "Autor",
                    "Gênero",
                    "Número",
                    "Quantidade",
                    "Ações",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{item.id}</td>
                    <td className="px-6 py-4 text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm">{item.author}</td>
                    <td className="px-6 py-4 text-sm">{item.gender}</td>
                    <td className="px-6 py-4 text-sm">{item.number}</td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        item.quantity <= 3
                          ? "text-red-500"
                          : item.quantity < 6
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm flex space-x-2">
                      <button
                        className="text-zinc-600 hover:text-zinc-800"
                        onClick={() => onOpenModal(item)}
                      >
                        <MdEdit className="inline text-xl text-green-500" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete className="inline text-xl text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={prevPage}
                className="px-3 py-1 text-gray-800 rounded border border-gray-400 hover:bg-gray-200 transition-colors"
              >
                <MdKeyboardArrowLeft />
              </button>
            )}
            {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
              const pageNumber = index + 1;
              return (
                pageNumber <= totalPages && (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              );
            })}
            {totalPages > 3 && currentPage < totalPages && (
              <span className="px-2 py-1 text-gray-600">...</span>
            )}
            {currentPage < totalPages && (
              <button
                onClick={nextPage}
                className="px-3 py-1 text-gray-800 rounded border border-gray-400 hover:bg-gray-200 transition-colors"
              >
                <MdKeyboardArrowRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
