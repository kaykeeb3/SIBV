import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  MdEdit,
  MdDelete,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 3);
  return date.toLocaleDateString("pt-BR");
};

// Função corrigida para obter o dia da semana em português
const getWeekDay = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // Verifica se a data é inválida

  // Ajusta a hora para o fuso horário desejado (UTC-3)
  date.setHours(date.getHours() + 3);

  const options = { weekday: "long", timeZone: "America/Sao_Paulo" };
  return date.toLocaleDateString("pt-BR", options);
};

// Exemplo de uso
const dateStr = "2024-10-15T00:00:00Z"; // Data em formato ISO
console.log(getWeekDay(dateStr)); // Saída: "terça-feira"

export function SchedulingTable({
  data,
  onOpenModal,
  handleDelete,
  handleReturn,
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setCurrentPage(1); // Resetar a página ao buscar
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (dayDiff) => {
    if (dayDiff < 0) return "text-red-500"; // Atrasado
    if (dayDiff === 0) return "text-yellow-500"; // Devolução Hoje
    return "text-green-500"; // Dentro do prazo
  };

  const handleReturnClick = (id) => {
    handleReturn(id);
    // Atualiza a lista filtrada removendo o item devolvido
    setFilteredData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>
      {filteredData.length === 0 ? (
        <div className="p-6 text-center">Nenhum agendamento encontrado.</div>
      ) : (
        <motion.table
          className="min-w-full divide-y divide-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                "Nome do Responsável",
                "Quantidade",
                "Equipamento ID", // Nova coluna
                "Data de Início",
                "Data de Devolução",
                "Dia da Semana",
                "Status",
                "Tipo",
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
          <tbody className="divide-y divide-zinc-300">
            {currentItems.map((item, index) => {
              const today = new Date();
              const returnDate = new Date(item.returnDate);
              const dayDiff = Math.ceil(
                (returnDate - today) / (1000 * 60 * 60 * 24)
              );
              const statusColor = getStatusColor(dayDiff);

              return (
                <tr
                  key={`${item.equipmentId}-${index}`}
                  className="hover:bg-zinc-100 transition-colors"
                >
                  <td className="px-4 py-4 text-sm">{item.name}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    {item.equipmentId}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(item.startDate)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(item.returnDate)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {getWeekDay(item.returnDate)}
                  </td>
                  <td className={`px-6 py-4 text-sm ${statusColor}`}>
                    {dayDiff < 0
                      ? "Atrasado"
                      : dayDiff === 0
                      ? "Devolução Hoje"
                      : `${dayDiff} dia(s) restante(s)`}
                  </td>
                  <td className="px-4 py-4 text-sm">{item.type}</td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleReturnClick(item.id)}
                      className="text-green-500"
                    >
                      <FaRegCheckCircle
                        className={`text-xl ${
                          item.returned ? "text-gray-500" : "text-green-500"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm flex space-x-2">
                    <button
                      onClick={() => onOpenModal(item)}
                      className="text-zinc-600 hover:text-zinc-800"
                    >
                      <MdEdit className="inline text-xl text-green-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
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
