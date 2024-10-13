import React from "react";
import { z } from "zod";
import { EquipmentService } from "../../../services/equipment/equipment";
import { toast } from "react-toastify";

// Define o esquema de validação com Zod
const formSchema = z.object({
  id: z.number().min(1, "ID é obrigatório."),
  name: z.string().min(1, "O nome é obrigatório."),
  type: z.string().min(1, "O tipo é obrigatório."),
  quantity: z
    .number()
    .min(1, "A quantidade deve ser um número positivo e maior que 0."),
});

const equipmentTypes = [
  "Audiovisual",
  "Informática",
  "Periféricos",
  "Televisão",
  "Outros",
];

export function EquipmentModal({
  formData,
  setFormData,
  onClose,
  errors,
  setErrors,
  onUpdateEquipment,
}) {
  // Função para lidar com a mudança nos inputs
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value, // Converte quantidade para número
    }));
  };

  // Função que lida com a edição do equipamento
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Limpa erros antes da validação
      setErrors({});
      // Valida os dados do formulário
      formSchema.parse(formData);

      // Chama o serviço para atualizar o equipamento
      const updatedEquipment = await EquipmentService.updateEquipment(
        formData.id,
        {
          name: formData.name,
          type: formData.type,
          quantity: formData.quantity,
        }
      );

      // Exibe mensagem de sucesso
      toast.success("Equipamento editado com sucesso!");

      // Atualiza o equipamento no estado da aplicação
      onUpdateEquipment(updatedEquipment); // Atualiza a lista de equipamentos

      // Limpa os erros (caso tenha algum resquício de erro anterior)
      setErrors({});

      // Fecha o modal
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
      } else if (error.response) {
        setErrors({
          general: [
            error.response.data.message || "Erro ao atualizar o equipamento.",
          ],
        });
        toast.error(
          error.response.data.message || "Erro ao atualizar o equipamento."
        );
      } else {
        setErrors({ general: ["Erro ao atualizar o equipamento."] });
        toast.error("Erro ao atualizar o equipamento.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-100 rounded-lg p-8 shadow-lg w-96 md:w-1/2">
        <h2 className="text-2xl mb-6 font-semibold">Editar Equipamento</h2>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "type"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-medium mb-2">
                  {field === "name" && "Nome"}
                  {field === "type" && "Tipo"}:
                </label>
                {field === "type" ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors[field] ? "border-red-500" : "border-gray-400"
                    } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                    aria-invalid={!!errors[field]}
                    aria-describedby={`${field}-error`}
                  >
                    <option value="">Selecione...</option>
                    {equipmentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors[field] ? "border-red-500" : "border-gray-400"
                    } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                    aria-invalid={!!errors[field]}
                    aria-describedby={`${field}-error`}
                  />
                )}
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

            {/* Campo de Quantidade */}
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
          </div>
          <div className="flex justify-end mt-4">
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
        </form>
      </div>
    </div>
  );
}
