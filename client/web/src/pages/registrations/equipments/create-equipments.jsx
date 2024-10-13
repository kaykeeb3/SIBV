import { useState } from "react";
import { z } from "zod";
import { EquipmentService } from "../../../services/equipment/equipment";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).max(100),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "Quantidade deve ser um número" })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Quantidade deve ser positiva" }),
});

export function RegisterEquipment() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
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
      const equipmentData = {
        name: result.data.name,
        type: result.data.type,
        quantity: result.data.quantity,
      };

      try {
        const response = await EquipmentService.createEquipment(equipmentData);
        console.log("Equipamento cadastrado com sucesso:", response);
        setErrors({});
        setFormData({ name: "", type: "", quantity: "" });
      } catch (error) {
        console.error("Erro ao cadastrar o equipamento:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Cadastro de Equipamento
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Nome */}
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
              placeholder="Digite o nome do equipamento"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Tipo - Select estilizado */}
          <div>
            <label className="block font-medium text-gray-700">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.type ? "border-red-500" : ""
              }`}
            >
              <option value="">Selecione...</option>
              <option value="Audiovisual">Audiovisual</option>
              <option value="Informática">Informática</option>
              <option value="Periféricos">Periféricos</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          {/* Quantidade */}
          <div>
            <label className="block font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="text" // Mudado para 'text'
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
