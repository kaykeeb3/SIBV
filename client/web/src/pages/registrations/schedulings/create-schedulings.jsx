import { useState } from "react";
import { z } from "zod";
import { SchedulesService } from "../../../services/schedules/schedules"; // Ajuste o caminho conforme necessário

// Definindo as validações com Zod
const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "Quantidade deve ser um número" })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Quantidade deve ser positiva" }),
  startDate: z.string().nonempty({ message: "Data de Início é obrigatória" }),
  returnDate: z
    .string()
    .nonempty({ message: "Data de Devolução é obrigatória" }),
  dayOfWeek: z.enum(
    ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    { message: "Dia da Semana inválido" }
  ),
  equipmentId: z
    .string()
    .regex(/^\d+$/, { message: "ID do Equipamento deve ser um número" })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "ID do Equipamento deve ser positivo",
    }),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
});

export function RegisterScheduling() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    startDate: "",
    returnDate: "",
    dayOfWeek: "",
    equipmentId: "",
    type: "",
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
      const schedulingData = {
        name: result.data.name,
        quantity: result.data.quantity,
        startDate: new Date(result.data.startDate).toISOString(),
        returnDate: new Date(result.data.returnDate).toISOString(),
        weekDay: result.data.dayOfWeek,
        equipmentId: result.data.equipmentId,
        type: result.data.type,
      };

      try {
        const response = await SchedulesService.createSchedule(schedulingData);
        console.log("Agendamento cadastrado com sucesso:", response);
        setErrors({});
        // Limpa os dados do formulário
        setFormData({
          name: "",
          quantity: "",
          startDate: "",
          returnDate: "",
          dayOfWeek: "",
          equipmentId: "",
          type: "",
        });
      } catch (error) {
        console.error("Erro ao cadastrar o agendamento:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Cadastrar Novo Agendamento
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
              Data de Devolução
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.returnDate ? "border-red-500" : ""
              }`}
            />
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Dia da Semana
            </label>
            <select
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.dayOfWeek ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Selecione um dia
              </option>
              <option value="Domingo">Domingo</option>
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
            </select>
            {errors.dayOfWeek && (
              <p className="text-red-500 text-sm mt-1">{errors.dayOfWeek}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              ID do Equipamento
            </label>
            <input
              type="number"
              name="equipmentId"
              value={formData.equipmentId}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.equipmentId ? "border-red-500" : ""
              }`}
              placeholder="Digite o ID do equipamento"
            />
            {errors.equipmentId && (
              <p className="text-red-500 text-sm mt-1">{errors.equipmentId}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                errors.type ? "border-red-500" : ""
              }`}
              placeholder="Digite o tipo"
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
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
