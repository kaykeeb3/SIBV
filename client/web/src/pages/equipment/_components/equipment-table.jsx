import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdEdit,
  MdDelete,
} from "react-icons/md";

export function EquipmentTable({ data, onOpenModal, onDelete, loading }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      onDelete(id);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);

    const filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.id.toString().includes(term) ||
        item.type.toLowerCase().includes(term)
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar por nome, ID ou tipo"
          value={searchTerm}
          onChange={handleSearch}
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
              <p>Nenhum equipamento encontrado.</p>
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
                  {["ID", "Nome", "Tipo", "Quantidade", "Ações"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-semibold"
                      >
                        {header}
                      </th>
                    )
                  )}
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
                    <td className="px-6 py-4 text-sm">{item.type}</td>
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
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 text-gray-800 rounded border border-gray-400 hover:bg-gray-200 transition-colors"
              >
                <MdKeyboardArrowLeft />
              </button>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 border-gray-400 hover:bg-gray-200"
                } transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
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
