import React from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  seriesCourse: z.string().min(1, "A série/curso é obrigatória"),
  startDate: z.string().min(1, "A data de início é obrigatória"),
  returnDate: z.string().min(1, "A data de entrega é obrigatória"),
  bookId: z.number().min(1, "O ID do livro é obrigatório"),
});

export function RequestModal({
  formData,
  setFormData,
  onClose,
  errors,
  setErrors,
  onSave,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    if (name === "bookId") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Valida o formulário
      formSchema.parse(formData);

      // Converte as datas para o formato ISO antes de enviar
      const requestData = {
        name: formData.name,
        seriesCourse: formData.seriesCourse,
        startDate: new Date(formData.startDate).toISOString(),
        returnDate: new Date(formData.returnDate).toISOString(),
        bookId: formData.bookId,
      };

      // Envia os dados formatados para a função onSave
      await onSave(requestData);
      onClose();
    } catch (error) {
      // Define os erros do formulário
      setErrors(error.flatten().fieldErrors);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-100 rounded-lg p-8 shadow-lg w-96 md:w-1/2">
        <h2 className="text-2xl mb-6 font-semibold">Editar Requisição</h2>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Nome do Aluno
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1">
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Série/Curso
              </label>
              <input
                type="text"
                name="seriesCourse"
                value={formData.seriesCourse}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.seriesCourse ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.seriesCourse}
                aria-describedby="seriesCourse-error"
              />
              {errors.seriesCourse && (
                <p
                  id="seriesCourse-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.seriesCourse[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Data de Início
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate.split("T")[0]} // Apenas a parte da data
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.startDate ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.startDate}
                aria-describedby="startDate-error"
              />
              {errors.startDate && (
                <p id="startDate-error" className="text-red-500 text-xs mt-1">
                  {errors.startDate[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Data de Entrega
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate.split("T")[0]} // Apenas a parte da data
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.returnDate ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.returnDate}
                aria-describedby="returnDate-error"
              />
              {errors.returnDate && (
                <p id="returnDate-error" className="text-red-500 text-xs mt-1">
                  {errors.returnDate[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                ID do Livro
              </label>
              <input
                type="number"
                name="bookId"
                value={formData.bookId || ""}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.bookId ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.bookId}
                aria-describedby="bookId-error"
              />
              {errors.bookId && (
                <p id="bookId-error" className="text-red-500 text-xs mt-1">
                  {errors.bookId[0]}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-6 col-span-2">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
