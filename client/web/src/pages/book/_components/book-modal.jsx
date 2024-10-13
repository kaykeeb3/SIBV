// Importações necessárias
import React from "react";
import { z } from "zod";
import { bookService } from "../../../services/book/book";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  author: z.string().min(1, "O autor é obrigatório."),
  gender: z.string().min(1, "O gênero é obrigatório."),
  quantity: z
    .number()
    .min(1, "A quantidade deve ser um número positivo e maior que 0."),
  number: z.number().min(1, "O número é obrigatório."),
});

export function BookModal({
  formData,
  setFormData,
  onClose,
  errors,
  setErrors,
  onUpdateBook,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "number" ? Number(value) : value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      await bookService.updateBook(formData.id, {
        name: formData.name,
        number: formData.number,
        author: formData.author,
        gender: formData.gender,
        quantity: formData.quantity,
      });
      toast.success("Livro editado com sucesso!");

      // Chama onUpdateBook com a nova versão do livro
      onUpdateBook(formData); // Isso não deve mudar a posição do livro
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
      } else if (error.response) {
        setErrors({
          general: [
            error.response.data.message || "Erro ao atualizar o livro.",
          ],
        });
        toast.error(
          error.response.data.message || "Erro ao atualizar o livro."
        );
      } else {
        setErrors({ general: ["Erro ao atualizar o livro."] });
        toast.error("Erro ao atualizar o livro.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-100 rounded-lg p-8 shadow-lg w-96 md:w-1/2">
        <h2 className="text-2xl mb-6 font-semibold">Editar Livro</h2>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "author", "gender", "number"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-medium mb-2">
                  {field === "name" && "Nome"}
                  {field === "author" && "Autor"}
                  {field === "gender" && "Gênero"}
                  {field === "number" && "Número"}:
                </label>
                <input
                  type={field === "number" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors[field] ? "border-red-500" : "border-gray-400"
                  } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                  aria-invalid={!!errors[field]}
                  aria-describedby={`${field}-error`}
                />
                {errors[field] && (
                  <p
                    id={`${field}-error`}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors[field][0]}
                  </p>
                )}
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Quantidade:
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.quantity ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.quantity}
                aria-describedby="quantidade-error"
              />
              {errors.quantity && (
                <p id="quantidade-error" className="text-red-500 text-xs mt-1">
                  {errors.quantity[0]}
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
