import React from "react";
import { z } from "zod";

// Esquema de validação com Zod
const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  quantity: z
    .number()
    .positive({ message: "A quantidade deve ser maior que 0" }),
  startDate: z.string().min(1, "A data de início é obrigatória"),
  returnDate: z.string().min(1, "A data de entrega é obrigatória"),
  weekDay: z.string().min(1, "O dia da semana é obrigatório"),
  equipmentId: z
    .number()
    .positive({ message: "O ID do equipamento é obrigatório" }),
  type: z.string().min(1, "O tipo é obrigatório"),
});

export function SchedulingModal({
  formData,
  setFormData,
  onClose,
  errors,
  setErrors,
  onEdit,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    const parsedValue =
      name === "quantity" || name === "equipmentId" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Valida o formulário
      formSchema.parse(formData);

      // Converte as datas para o formato ISO antes de enviar
      const schedulingData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        returnDate: new Date(formData.returnDate).toISOString(),
      };

      // Envia os dados formatados para a função onEdit
      await onEdit(schedulingData);
      onClose();
    } catch (error) {
      // Define os erros do formulário
      setErrors(error.flatten().fieldErrors);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-100 rounded-lg p-8 shadow-lg w-96 md:w-1/2">
        <h2 className="text-2xl mb-6 font-semibold">Editar Agendamento</h2>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Nome do Responsável
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
                Quantidade
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || ""}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.quantity ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.quantity}
                aria-describedby="quantity-error"
              />
              {errors.quantity && (
                <p id="quantity-error" className="text-red-500 text-xs mt-1">
                  {errors.quantity[0]}
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
                Data de Devolução
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
                Dia da Semana
              </label>
              <input
                type="text"
                name="weekDay"
                value={formData.weekDay}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.weekDay ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.weekDay}
                aria-describedby="weekDay-error"
              />
              {errors.weekDay && (
                <p id="weekDay-error" className="text-red-500 text-xs mt-1">
                  {errors.weekDay[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                ID do Equipamento
              </label>
              <input
                type="number"
                name="equipmentId"
                value={formData.equipmentId || ""}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.equipmentId ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.equipmentId}
                aria-describedby="equipmentId-error"
              />
              {errors.equipmentId && (
                <p id="equipmentId-error" className="text-red-500 text-xs mt-1">
                  {errors.equipmentId[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.type ? "border-red-500" : "border-gray-400"
                } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                aria-invalid={!!errors.type}
                aria-describedby="type-error"
              />
              {errors.type && (
                <p id="type-error" className="text-red-500 text-xs mt-1">
                  {errors.type[0]}
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
