import React from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

export function StatsCard({
  bookCount,
  loanCount,
  equipmentCount,
  scheduleCount,
  loanTrend,
  loans = [],
  schedules = [],
}) {
  const overdueLoansCount = loans.filter(
    (loan) => new Date(loan.returnDate) < new Date()
  ).length;

  const overdueSchedulesCount = schedules.filter(
    (schedule) => new Date(schedule.returnDate) < new Date()
  ).length;

  // Cálculo de devoluções por curso/série
  const returnCounts = loans.reduce(
    (acc, loan) => {
      const { seriesCourse } = loan;

      // Contagem por curso/série
      acc.seriesCount[seriesCourse] = (acc.seriesCount[seriesCourse] || 0) + 1;

      return acc;
    },
    { seriesCount: {} }
  );

  const topCourseByReturns = Object.entries(returnCounts.seriesCount).sort(
    (a, b) => b[1] - a[1]
  )[0] || ["N/A", 0];

  const chartOptionsPie = {
    chart: {
      type: "pie",
      toolbar: { show: false },
      background: "#ffffff",
    },
    labels: ["Livros", "Empréstimos", "Equipamentos", "Agendamentos"],
    colors: ["#4a90e2", "#7ed321", "#d0021b", "#f8e71c"],
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
    },
  };

  const chartDataPie = {
    series: [bookCount, loanCount, equipmentCount, scheduleCount],
  };

  const chartOptionsGroupedBar = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "#ffffff",
    },
    xaxis: {
      categories: loanTrend.map((data) => data.label),
      labels: {
        style: {
          colors: "#4b5563",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#4a90e2", "#7ed321", "#d0021b", "#f8e71c"],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartDataGroupedBar = {
    series: [
      {
        name: "Livros",
        data: Array(loanTrend.length).fill(bookCount),
      },
      {
        name: "Empréstimos",
        data: loanTrend.map((data) => data.value),
      },
      {
        name: "Agendamentos",
        data: Array(loanTrend.length).fill(scheduleCount),
      },
      {
        name: "Equipamentos",
        data: Array(loanTrend.length).fill(equipmentCount),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left">
          Estatísticas de Recursos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: "Livros",
              count: bookCount,
              borderColor: "border-blue-500",
            },
            {
              label: "Empréstimos",
              count: loanCount,
              borderColor: "border-green-500",
            },
            {
              label: "Equipamentos",
              count: equipmentCount,
              borderColor: "border-red-500",
            },
            {
              label: "Agendamentos",
              count: scheduleCount,
              borderColor: "border-yellow-500",
            },
            {
              label: "Empréstimos Atrasados",
              count: overdueLoansCount,
              borderColor: "border-orange-600",
            },
            {
              label: "Agendamentos Atrasados",
              count: overdueSchedulesCount,
              borderColor: "border-indigo-500",
            },
            // Card para Curso/Série que Devolveu Mais Livros
            {
              label: "Curso/Série que Devolveu Mais Livros",
              count: `${topCourseByReturns[0]}: ${topCourseByReturns[1]} devoluções`,
              borderColor: "border-purple-500",
            },
          ].map(({ label, count, borderColor }, index) => (
            <div
              key={`${label}-${index}`}
              className={`flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-md ${borderColor} border-b-8 text-center`}
            >
              <h3 className="text-3xl font-semibold text-gray-800 text-center mb-1">
                {count}
              </h3>
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-center">
              Tendência de Dados
            </h3>
            <Chart
              options={chartOptionsGroupedBar}
              series={chartDataGroupedBar.series}
              type="bar"
              height={350}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-center">
              Uso dos Recursos
            </h3>
            <Chart
              options={chartOptionsPie}
              series={chartDataPie.series}
              type="pie"
              height={350}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
