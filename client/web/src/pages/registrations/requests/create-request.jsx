import { useState } from "react";
import { z } from "zod";
import { RequestService } from "../../../services/request/request"; // Ajuste o caminho conforme necessário

// Definindo as validações com Zod
const schema = z.object({
  student: z.string().min(1, { message: "Aluno é obrigatório" }),
  course: z.string().min(1, { message: "Série/Curso é obrigatório" }),
  startDate: z.string().nonempty({ message: "Data de Início é obrigatória" }),
  deliveryDate: z
    .string()
    .nonempty({ message: "Data de Entrega é obrigatória" }),
  bookId: z
    .string()
    .regex(/^\d+$/, { message: "ID do Livro deve ser um número" })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "ID do Livro deve ser positivo" }),
});

export function RequestRegister() {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    startDate: "",
    deliveryDate: "",
    bookId: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      // Formatar as datas para ISO-8601
      const requestData = {
        name: result.data.student, // Mudado de student para name
        seriesCourse: result.data.course, // Mudado de course para seriesCourse
        startDate: new Date(result.data.startDate).toISOString(), // Formata a data de início
        returnDate: new Date(result.data.deliveryDate).toISOString(), // Formata a data de entrega
        bookId: result.data.bookId, // Mantido como está
      };

      try {
        const response = await RequestService.createRequest(requestData);
        console.log("Requisição cadastrada com sucesso:", response);
        setErrors({});
        // Limpa os dados do formulário
        setFormData({
          student: "",
          course: "",
          startDate: "",
          deliveryDate: "",
          bookId: "",
        });
      } catch (error) {
        console.error("Erro ao cadastrar a requisição:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Cadastro de Requisição
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-medium text-gray-700">Aluno</label>
            <input
              type="text"
              name="student"
              value={formData.student}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.student ? "border-red-500" : ""
              }`}
              placeholder="Digite o nome do aluno"
            />
            {errors.student && (
              <p className="text-red-500 text-sm mt-1">{errors.student}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Série/Curso
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.course ? "border-red-500" : ""
              }`}
              placeholder="Digite a série/curso"
            />
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Data de Início
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.startDate ? "border-red-500" : ""
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Data de Entrega
            </label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.deliveryDate ? "border-red-500" : ""
              }`}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              ID do Livro
            </label>
            <input
              type="number"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.bookId ? "border-red-500" : ""
              }`}
              placeholder="Digite o ID do livro"
            />
            {errors.bookId && (
              <p className="text-red-500 text-sm mt-1">{errors.bookId}</p>
            )}
          </div>

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
