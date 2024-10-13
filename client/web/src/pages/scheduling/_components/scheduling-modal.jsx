import React from "react";
import { z } from "zod";

const formSchema = z.object({
  nomeResponsavel: z.string().min(1, "Nome do Responsável é obrigatório"),
  quantidade: z
    .number()
    .min(1, "Quantidade deve ser um número positivo e maior que 0"),
  dataInicio: z.string().min(1, "Data de Início é obrigatória"),
  dataDevolucao: z.string().min(1, "Data de Devolução é obrigatória"),
  diaSemana: z.string().min(1, "Dia da Semana é obrigatório"),
});

export function SchedulingModal({
  formData,
  setFormData,
  onClose,
  errors,
  setErrors,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      alert("Agendamento editado com sucesso!");
      onClose();
    } catch (error) {
      setErrors(error.flatten().fieldErrors);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-zinc-100 rounded-lg p-8 shadow-lg w-96 md:w-1/2">
        <h2 className="text-2xl mb-6 font-semibold">Editar Agendamento</h2>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "nomeResponsavel",
              "quantidade",
              "dataInicio",
              "dataDevolucao",
              "diaSemana",
            ].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-medium mb-2">
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </label>
                <input
                  type={field.includes("data") ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors[field] ? "border-red-500" : "border-gray-400"
                  } rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400`}
                  aria-invalid={!!errors[field]}
                  aria-describedby={`${field}-error`}
                  // O campo diaSemana agora é sempre habilitado
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
        </form>
      </div>
    </div>
  );
}
