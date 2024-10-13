import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";

export function FilterDropdown({ isOpen, toggleDropdown, setCategory }) {
  const options = [
    "Todos",
    "Romance",
    "Aventura",
    "Fantasia",
    "Drama",
    "Suspense",
    "Terror/Horror",
    "Crônica",
    "Conto",
    "Poesia",
    "Biografia",
    "Nacional",
    "Material Acadêmico",
    "Ficção Científica",
    "Outros",
  ];

  const handleOptionClick = (option) => {
    setCategory(option);
    toggleDropdown(); // Fecha o dropdown ao selecionar a categoria
  };

  return (
    <div className="flex items-center justify-end w-full max-w-6xl mb-4 gap-3">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-800 transition duration-200 text-zinc-100 text-sm"
        >
          <IoFilterSharp className="text-xs mr-1" />
          Filtrar
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-56 bg-blue-700 rounded-md shadow-lg z-10">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 text-zinc-100 hover:bg-blue-800 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="flex items-center rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-800 transition duration-200 text-zinc-100 text-sm">
        <CiFileOn className="text-xs mr-1" />
        Exportar
      </button>
    </div>
  );
}
