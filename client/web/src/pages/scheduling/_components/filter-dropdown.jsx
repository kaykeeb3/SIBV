import { IoFilterSharp } from "react-icons/io5";

export function FilterDropdown({
  isOpen,
  toggleDropdown,
  setCategory,
  category,
}) {
  const options = ["Todos", "Televisão", "Projetor", "Periféricos"];

  return (
    <div className="flex items-center justify-end w-full max-w-6xl mb-4 gap-3">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-800 transition duration-200 text-zinc-100 text-sm"
        >
          <IoFilterSharp className="text-xs mr-1" />
          Filtrar: {category}
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-56 bg-blue-700 rounded-md shadow-lg z-10">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setCategory(option);
                    toggleDropdown();
                  }}
                  className="px-4 py-2 text-zinc-100 hover:bg-blue-800 cursor-pointer transition duration-200"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
