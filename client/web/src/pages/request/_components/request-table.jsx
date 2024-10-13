import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  MdEdit,
  MdDelete,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { motion } from "framer-motion";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 3);
  return date.toLocaleDateString("pt-BR");
};

export function RequestTable({
  data,
  onOpenModal,
  loading,
  handleDelete,
  handleReturn,
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRequests(data);
  }, [data]);

  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.seriesCourse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleReturnBook = async (item) => {
    await handleReturn(item.id);
    if (requests.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou série/curso"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>

      {loading ? (
        <div className="p-6 animate-pulse">{/* Loader */}</div>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>Nenhuma requisição encontrada.</p>
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
                    "Nome do Aluno",
                    "Série/Curso",
                    "Data de Início",
                    "Data de Entrega",
                    "Status",
                    "Propriedade",
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
                {currentItems.map((item) => {
                  const returnDate = new Date(item.returnDate);
                  const today = new Date();
                  today.setHours(today.getHours() + 3);
                  const dayDiff = Math.ceil(
                    (returnDate - today) / (1000 * 60 * 60 * 24)
                  );

                  let statusColor;
                  if (dayDiff < 0) {
                    statusColor = "text-red-500";
                  } else if (dayDiff === 0) {
                    statusColor = "text-orange-500";
                  } else if (dayDiff <= 2) {
                    statusColor = "text-yellow-500";
                  } else {
                    statusColor = "text-green-500";
                  }

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">{item.name}</td>
                      <td className="px-6 py-4 text-sm">{item.seriesCourse}</td>
                      <td className="px-6 py-4 text-sm">
                        {formatDate(item.startDate)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {formatDate(item.returnDate)}
                      </td>
                      <td className={`px-6 py-4 text-sm ${statusColor}`}>
                        {dayDiff < 0
                          ? "Atrasado"
                          : dayDiff === 0
                          ? "Devolução Hoje"
                          : `${dayDiff} dia(s) restante(s)`}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        {!item.returned ? (
                          <button
                            onClick={() => handleReturnBook(item)}
                            className="text-green-500"
                          >
                            <FaRegCheckCircle className="text-xl" />
                          </button>
                        ) : (
                          <FaRegCheckCircle className="text-green-500" />
                        )}
                        {/* {item.property} */}
                      </td>
                      <td className="px-6 py-4 text-sm flex space-x-2 items-center">
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
                  );
                })}
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
