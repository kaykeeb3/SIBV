import React, { useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

export function Header({ onLogout, isLoginPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout && typeof onLogout === "function") {
      onLogout();
    }
    window.location.reload();
  };

  return (
    <header className="border-b border-zinc-200 shadow-md h-16 flex items-center justify-between relative">
      <div className="mx-auto flex items-center justify-end w-full gap-2 px-8">
        {!isLoginPage && (
          <>
            <motion.h2
              className="text-xs font-bold text-left max-w-24 text-zinc-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Kayke Barbosa
              <br />
              <span className="font-medium text-zinc-700">ADM</span>
            </motion.h2>

            <motion.div
              className="flex items-center justify-center rounded-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="rounded-full w-10 h-10 hover:opacity-85 transition-opacity duration-200"
                src="https://img.freepik.com/fotos-gratis/homem-retrato-rindo_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727308800&semt=ais_hybrid"
                alt="Usuário"
              />
            </motion.div>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-zinc-900 font-semibold rounded-md transition duration-200"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoIosArrowDown className="text-xl text-zinc-950 hover:text-zinc-500" />
            </motion.button>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="absolute right-4 top-20 z-50 bg-zinc-50 border border-zinc-400 rounded-lg shadow-lg p-6 transition-transform duration-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Você tem certeza?
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <IoMdClose className="text-xl text-zinc-900 hover:text-red-500" />
              </button>
            </div>
            <p className="text-gray-600">Deseja sair da sua conta?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleLogout}
                className="mr-2 text-red-500 font-semibold hover:underline"
              >
                Sair
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-900 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
}
