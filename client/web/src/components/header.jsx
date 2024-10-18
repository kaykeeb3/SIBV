import React, { useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

export function Header({ onLogout, isLoginPage, user }) {
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
        {!isLoginPage && user && (
          <>
            <motion.h2
              className="text-xs font-bold text-left max-w-24 text-zinc-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Olá, {user.name} ({user.role})
            </motion.h2>
            <motion.img
              src={user.profilePicture}
              alt={user.name}
              className="w-8 h-8 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <button
                className="flex items-center gap-1 text-zinc-900"
                onClick={() => setIsModalOpen((prev) => !prev)} // Alterna a exibição do modal
              >
                <IoIosArrowDown className="text-xl" />
              </button>
              {isModalOpen && (
                <div className="absolute right-0 bg-white border rounded-md shadow-md p-2">
                  <button
                    className="flex items-center justify-between w-full text-zinc-900 font-semibold"
                    onClick={handleLogout} // Chama a função de logout ao clicar
                  >
                    <span>Logout</span>
                    <IoMdClose className="text-xl text-zinc-900" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
