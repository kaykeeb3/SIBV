import React, { useState } from "react";
import { handleLogin } from "../../services/auth/auth";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export function Login({ onLogin, setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!credentials.email || !credentials.password) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const token = await handleLogin(credentials, setUser);
      onLogin(token);
      toast.success("Login realizado com sucesso! Bem-vindo(a) de volta.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Verifique suas credenciais e tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.form
        onSubmit={onLoginHandler}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
          Acesse sua conta
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 text-left">
          Se você não possui uma conta, entre em contato com o suporte.
        </p>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Endereço de E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="Informe seu e-mail"
            required
            aria-label="Email"
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Senha
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full border text-gray-800 rounded-md p-3 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 transition duration-300 ease-in-out"
            placeholder="******"
            required
            aria-label="Senha"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 bottom-0 top-7 flex items-center text-gray-600 focus:outline-none"
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <motion.button
          type="submit"
          className={`bg-blue-600 text-white py-3 rounded-md w-full font-medium hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Entrar"}
        </motion.button>

        <div className="pt-3 text-xs text-right">
          <a
            href="https://api.whatsapp.com/send?phone=88994013479"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Esqueceu sua senha?
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          © 2024 Todos os direitos reservados.
        </p>
      </motion.form>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
