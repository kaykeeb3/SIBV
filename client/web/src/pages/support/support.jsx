import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { SupportTable } from "./_components/support-table"; // Importe o novo componente

const generateUsers = (num) => {
  const users = [];
  for (let i = 1; i <= num; i++) {
    users.push({
      id: i,
      name: `Usuário ${i}`,
      institution: `Instituição ${String.fromCharCode(65 + (i % 5))}`, // Instituições A-E
      limit: Math.floor(Math.random() * 100) + 1,
      role: i % 2 === 0 ? "Usuário Comum" : "Administrador",
      email: `usuario${i}@exemplo.com`,
      phone: `+55 11 9${Math.floor(Math.random() * 99999999)
        .toString()
        .padStart(8, "0")}`,
      registrationDate: new Date(
        2022,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("pt-BR"),
    });
  }
  return users;
};

const users = generateUsers(40); // Gera 40 usuários

export function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-4">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-start items-center p-4 bg-gray-100 gap-3">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            className="flex items-center justify-center bg-blue-500 text-white px-3 py-3 rounded hover:bg-blue-600 transition"
            title="Adicionar"
          >
            <AiOutlinePlus />
          </button>
        </div>

        <SupportTable
          currentItems={currentItems}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
