import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleLogin } from "../../services/auth/auth";

export function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      onLogin(token);
    }
  }, [onLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!credentials.email) {
      newErrors.email = "Email é obrigatório.";
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Senha é obrigatória.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onLoginHandler = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      await handleLogin(credentials, onLogin);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro durante o login:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Por favor, verifique seu e-mail e senha e tente novamente!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-left text-gray-800">
              Conecte-se <br />
              <span className="text-base font-medium text-gray-600">
                Seja bem-vindo(a) novamente
              </span>
            </h1>
          </div>
          <div className="mb-4 mt-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Usuário*
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              placeholder="Informe seu usuário"
              value={credentials.email}
              onChange={handleInputChange}
              aria-label="Email"
              className={`w-full border font-normal text-gray-800 rounded-md p-3 bg-gray-50 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 transition duration-300 ease-in-out ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Senha*
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="******"
                value={credentials.password}
                onChange={handleInputChange}
                aria-label="Senha"
                className={`w-full border font-normal text-gray-800 rounded-md p-3 bg-gray-50 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 transition duration-300 ease-in-out ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                aria-label={
                  isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {isPasswordVisible ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <motion.button
            onClick={onLoginHandler}
            disabled={isLoading}
            className={`bg-blue-600 text-white py-2 rounded-md w-full hover:bg-blue-700 transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Carregando..." : "Login"}
          </motion.button>
          <div className="pt-3 text-xs text-right">
            <a
              href="https://api.whatsapp.com/send?phone=88994013479"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 underline hover:text-blue-600 transition duration-200"
            >
              Esqueci minha senha
            </a>
          </div>
        </motion.div>
      </motion.div>

      <ToastContainer position="bottom-right" />
    </>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
