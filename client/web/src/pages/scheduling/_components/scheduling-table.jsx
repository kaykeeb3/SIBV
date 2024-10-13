import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCheckCircle,
} from "react-icons/ai";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "long" };
  return date.toLocaleDateString("pt-BR", options);
};

export function SchedulingTable({ data, onOpenModal, loading }) {
  const itemsPerPage = 10; // Itens por página
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calcula os itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
      {loading ? (
        <div className="p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
        </div>
      ) : (
        <motion.table
          className="min-w-full divide-y divide-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-zinc-700 text-zinc-100">
            <tr>
              {[
                "Nome do Responsável",
                "Quantidade",
                "Data de Início",
                "Data de Devolução",
                "Dia da Semana",
                "Status",
                "Propriedade",
                "Ações",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-300">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-100 transition-colors">
                <td className="px-4 py-4 text-sm">{item.nomeResponsavel}</td>
                <td className="px-4 py-4 text-sm">{item.quantidade}</td>
                <td className="px-4 py-4 text-sm">
                  {formatDate(item.dataInicio)}
                </td>
                <td className="px-4 py-4 text-sm">
                  {formatDate(item.dataDevolucao)}
                </td>
                <td className="px-4 py-4 text-sm">
                  {getDayOfWeek(item.dataInicio)}
                </td>
                <td className="px-4 py-4 text-sm">
                  {item.status ? (
                    <AiOutlineCheck className="text-green-500" />
                  ) : (
                    <AiOutlineClose className="text-red-500" />
                  )}
                </td>
                <td className="px-4 py-4 text-sm">
                  <button>
                    <AiOutlineCheckCircle className="text-green-500 text-xl" />
                  </button>
                </td>
                <td className="px-4 py-4 text-sm">
                  <button
                    onClick={() => onOpenModal(item)}
                    className="text-zinc-900 hover:text-zinc-700"
                  >
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
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
                disabled={currentPage === totalPages}
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
