import { useState } from "react";
import { z } from "zod";
import { bookService } from "../../../services/book/book";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).max(100),
  number: z
    .number()
    .min(0, { message: "Número deve ser maior ou igual a 0" })
    .max(1000000, { message: "Número deve ser menor ou igual a 1.000.000" }),
  author: z.string().min(1, { message: "Autor é obrigatório" }).max(100),
  genre: z.string().min(1, { message: "Gênero é obrigatório" }).max(50),
  quantity: z.number().min(1, { message: "Quantidade deve ser positiva" }),
});

export function BookRegister() {
  const [formData, setFormData] = useState({
    name: "",
    number: 0,
    author: "",
    genre: "",
    quantity: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "number" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = schema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    } else {
      const bookData = {
        name: result.data.name,
        number: result.data.number,
        author: result.data.author,
        gender: result.data.genre,
        quantity: result.data.quantity,
      };

      try {
        const response = await bookService.createBook(bookData);
        console.log("Livro cadastrado com sucesso:", response);
        setErrors({});
        setFormData({
          name: "",
          number: 0,
          author: "",
          genre: "",
          quantity: 1,
        });
      } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Cadastro de Livro
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Digite o nome"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Número</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.number ? "border-red-500" : ""
              }`}
              placeholder="Digite o número"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Autor</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.author ? "border-red-500" : ""
              }`}
              placeholder="Digite o autor"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Gênero</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.genre ? "border-red-500" : ""
              }`}
              placeholder="Digite o gênero"
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.quantity ? "border-red-500" : ""
              }`}
              placeholder="Digite a quantidade"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Botão de envio */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
