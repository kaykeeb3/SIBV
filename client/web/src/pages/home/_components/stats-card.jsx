import React from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

export function StatsCard({
  livrosCount,
  emprestimosCount,
  equipamentosCount,
  agendamentosCount,
  additionalData = [],
}) {
  // Configurações do gráfico de barras
  const chartOptionsBar = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "#f9fafb",
    },
    xaxis: {
      categories: ["Livros", "Empréstimos", "Equipamentos", "Agendamentos"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#3b82f6", "#ef4444", "#34d399", "#fbbf24"], // Azul, Vermelho, Verde, Amarelo
    grid: {
      borderColor: "#e5e7eb",
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartDataBar = {
    series: [
      {
        name: "Contagem",
        data: [
          livrosCount,
          emprestimosCount,
          equipamentosCount,
          agendamentosCount,
        ],
      },
    ],
  };

  // Configurações do gráfico de linha
  const chartOptionsLine = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "#f9fafb",
    },
    xaxis: {
      categories: additionalData.map((data) => data.label || ""),
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#34d399"], // Verde
    grid: {
      borderColor: "#e5e7eb",
    },
    tooltip: {
      theme: "dark",
    },
  };

  const trendData =
    additionalData.length > 0
      ? additionalData
      : [
          { label: "Jan", value: 20 },
          { label: "Fev", value: 30 },
          { label: "Mar", value: 25 },
          { label: "Abr", value: 35 },
          { label: "Mai", value: 40 },
          { label: "Jun", value: 50 },
        ];

  const chartDataLine = {
    series: [
      {
        name: "Tendência",
        data: trendData.map((data) => data.value || 0),
      },
    ],
  };

  // Configurações do gráfico de pizza
  const chartOptionsPie = {
    chart: {
      type: "pie",
      toolbar: { show: false },
      background: "#f9fafb",
    },
    labels: ["Livros", "Empréstimos", "Equipamentos", "Agendamentos"],
    colors: ["#3b82f6", "#ef4444", "#34d399", "#fbbf24"], // Azul, Vermelho, Verde, Amarelo
    tooltip: {
      theme: "dark",
    },
  };

  const chartDataPie = {
    series: [
      livrosCount,
      emprestimosCount,
      equipamentosCount,
      agendamentosCount,
    ],
  };

  // Configurações do gráfico de área
  const chartOptionsArea = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "#f9fafb",
    },
    xaxis: {
      categories: trendData.map((data) => data.label || ""),
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#fbbf24"], // Amarelo
    grid: {
      borderColor: "#e5e7eb",
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartDataArea = {
    series: [
      {
        name: "Área Acumulada",
        data: trendData.map((data) => data.value || 0),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        className="bg-zinc-100 p-6 rounded-lg shadow-lg w-full md:w-4/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Gráfico de Contagem (Barras) */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Gráfico de Contagem
            </h3>
            <Chart
              options={chartOptionsBar}
              series={chartDataBar.series}
              type="bar"
              height={400}
            />
          </div>
          {/* Gráfico de Tendência (Linhas) */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tendência de Dados
            </h3>
            <Chart
              options={chartOptionsLine}
              series={chartDataLine.series}
              type="line"
              height={400}
            />
          </div>

          {/* Gráfico de Pizza */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Proporção de Categorias
            </h3>
            <Chart
              options={chartOptionsPie}
              series={chartDataPie.series}
              type="pie"
              height={400}
            />
          </div>

          {/* Gráfico de Área */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Área Acumulada de Dados
            </h3>
            <Chart
              options={chartOptionsArea}
              series={chartDataArea.series}
              type="area"
              height={400}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
