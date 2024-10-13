import { Link } from "react-router-dom";
import { FaAddressBook, FaClipboardUser } from "react-icons/fa6";
import { PiDesktopTowerDuotone } from "react-icons/pi";
import { FaUserCog } from "react-icons/fa";
import { GiNotebook, GiBookshelf } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { MdBadge } from "react-icons/md";
import { IoDesktopSharp, IoHome } from "react-icons/io5";
import { motion } from "framer-motion";

export function Menu() {
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-blue-700 text-white flex flex-col items-center shadow-lg z-50">
      <div className="flex flex-col items-center justify-center gap-6 relative flex-grow">
        {/* Itens do Menu */}
        {[
          { icon: <IoHome />, label: "Home", path: "/" },
          { icon: <GiBookshelf />, label: "Livros", path: "/livros" },
          {
            icon: <FaAddressBook />,
            label: "Requisições",
            path: "/requisicoes",
          },
          {
            icon: <PiDesktopTowerDuotone />,
            label: "Equipamentos",
            path: "/equipamentos",
          },
          {
            icon: <FaClipboardUser />,
            label: "Agendamentos",
            path: "/agendamentos",
          },
          {
            icon: <FaUserCog />,
            label: "+ Requisições",
            path: "/nova-requisicao",
          },
          { icon: <GiNotebook />, label: "+ Livros", path: "/novo-livro" },
          {
            icon: <IoDesktopSharp />,
            label: "+ Equipamentos",
            path: "/novo-equipamento",
          },
          {
            icon: <MdBadge />,
            label: "+ Agendamentos",
            path: "/novo-agendamento",
          },
        ].map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="group flex items-center p-2 hover:bg-blue-800 rounded-lg transition duration-200 relative" // Reduzido o padding
          >
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div className="text-xl">{item.icon}</div>
              <span className="absolute left-20 hidden group-hover:block text-sm whitespace-nowrap bg-blue-800 text-white p-1 rounded-md shadow-lg">
                {item.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Ícone de Configurações na parte inferior */}
      <motion.div
        className="group flex items-center mb-5 p-2 hover:bg-blue-700 rounded-lg transition duration-200 relative" // Reduzido o padding
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      >
        <FiSettings className="text-xl pointer-events-none" />
        <span className="absolute left-20 hidden group-hover:block text-sm whitespace-nowrap bg-blue-800 text-white p-1 rounded-md shadow-lg">
          Configurações
        </span>
      </motion.div>
    </div>
  );
}
