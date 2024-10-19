import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdClose,
  IoMdNotificationsOutline,
  IoMdSettings,
} from "react-icons/io";
import { motion } from "framer-motion";

export function Header({ onLogout, isLoginPage, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [profilePicture, setProfilePicture] = useState(
    user ? user.profilePicture : ""
  );

  // Função para pegar o primeiro nome do usuário
  const getFirstName = (fullName) => {
    return fullName.split(" ")[0]; // Divide o nome completo por espaços e retorna o primeiro nome
  };

  const handleLogout = () => {
    if (onLogout && typeof onLogout === "function") {
      onLogout(); // Chama a função de logout
    }
    window.location.reload(); // Recarrega a página após logout
  };

  const handleSaveProfile = () => {
    // Aqui você pode implementar a lógica para salvar as informações do perfil
    console.log("Nome:", name);
    console.log("Imagem de perfil:", profilePicture);
    setIsEditProfileOpen(false); // Fecha o modal de edição
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 h-16 flex items-center justify-end px-6 md:px-8">
      <div className="flex items-center space-x-6">
        {/* Se o usuário estiver logado, exibe os ícones de notificação e configurações */}
        {user && (
          <div className="flex items-center space-x-4">
            <button
              className="relative text-gray-600 hover:text-gray-900 transition duration-200"
              aria-label="Notificações"
            >
              <IoMdNotificationsOutline className="text-2xl" />
              {/* Sinal de notificação */}
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
            </button>

            <button
              className="text-gray-600 hover:text-gray-900 transition duration-200"
              onClick={() => setIsEditProfileOpen(true)} // Abre o modal de edição de perfil
              aria-label="Configurações"
            >
              <IoMdSettings className="text-2xl" />
            </button>
          </div>
        )}

        {/* Se o usuário não estiver logado, não exibe as informações do perfil */}
        {!isLoginPage && user && (
          <div
            className="relative flex items-center gap-3 cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Imagem de perfil animada */}
            <motion.img
              src={user.profilePicture}
              alt={user.name}
              className="w-10 h-10 rounded-full shadow-lg object-cover border-blue-700 border"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Nome e cargo do usuário */}
            <motion.div
              className="flex flex-col items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-base font-semibold text-gray-900 truncate">
                Olá, {user.name ? getFirstName(user.name) : "Usuário"}
              </span>
              <span className="text-xs font-medium text-gray-700">
                ({user.role})
              </span>
            </motion.div>

            {/* Botão de menu com animação */}
            <div className="relative">
              <button
                className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 transition duration-200"
                onClick={() => setIsModalOpen((prev) => !prev)}
                aria-label="Menu"
              >
                {isModalOpen ? (
                  <IoIosArrowUp className="text-lg" />
                ) : (
                  <IoIosArrowDown className="text-lg" />
                )}
              </button>

              {/* Modal de logout */}
              {isModalOpen && (
                <motion.div
                  className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3">
                    <p className="text-gray-700 mb-3">Você deseja sair?</p>
                    <button
                      className="w-full flex items-center justify-between px-4 py-2 bg-red-50 text-red-600 font-medium rounded-md hover:bg-red-100 transition duration-150"
                      onClick={handleLogout}
                    >
                      <span>Sair</span>
                      <IoMdClose className="text-xl" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sombreado da tela */}
      {isEditProfileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsEditProfileOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-96 bg-white z-20 p-6 shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Nome:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="profilePicture"
              >
                URL da Imagem:
              </label>
              <input
                type="text"
                id="profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="URL da imagem do perfil"
              />
            </div>
            <div className="flex justify-end it">
              <button
                className="mr-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150"
                onClick={handleSaveProfile}
              >
                Salvar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-150"
                onClick={() => setIsEditProfileOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </header>
  );
}
