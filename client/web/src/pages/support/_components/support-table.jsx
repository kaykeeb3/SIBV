import React from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export function SupportTable({
  currentItems,
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  return (
    <>
      <motion.table
        className="min-w-full divide-y divide-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-medium">ID</th>
            <th className="px-4 py-3 text-left font-medium">Nome</th>
            <th className="px-4 py-3 text-left font-medium">Instituição</th>
            <th className="px-4 py-3 text-left font-medium">Limite</th>
            <th className="px-4 py-3 text-left font-medium">Função</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Telefone</th>
            <th className="px-4 py-3 text-left font-medium">
              Data de Cadastro
            </th>
            <th className="px-4 py-3 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {currentItems.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-4 text-sm">{user.id}</td>
              <td className="px-4 py-4 text-sm">{user.name}</td>
              <td className="px-4 py-4 text-sm">{user.institution}</td>
              <td className="px-4 py-4 text-sm">{user.limit}</td>
              <td className="px-4 py-4 text-sm">{user.role}</td>
              <td className="px-4 py-4 text-sm">{user.email}</td>
              <td className="px-4 py-4 text-sm">{user.phone}</td>
              <td className="px-4 py-4 text-sm">{user.registrationDate}</td>
              <td className="px-4 py-4 text-sm flex space-x-2">
                <AiOutlineUser
                  className="text-gray-600 cursor-pointer hover:text-blue-500"
                  title="Ver usuário"
                />
                <AiOutlineEdit
                  className="text-green-600 cursor-pointer hover:text-green-800"
                  title="Editar"
                />
                <AiOutlineDelete
                  className="text-red-600 cursor-pointer hover:text-red-800"
                  title="Deletar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      {totalPages > 1 && (
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 text-gray-800 rounded border border-gray-400 hover:bg-gray-200 transition-colors"
              >
                {" "}
                <MdKeyboardArrowLeft />
              </button>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
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
    </>
  );
}
