import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "../home/_components/menu";
import { Loading } from "../home/_components/loading";
import { StatsCard } from "../home/_components/stats-card";

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsCounts, setStatsCounts] = useState({
    livrosCount: 0,
    emprestimosCount: 0,
    equipamentosCount: 0,
    agendamentosCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          "https://sibi-api.vercel.app/livros",
          "https://sibi-api.vercel.app/emprestimos",
          "https://sibi-api.vercel.app/equipamentos",
          "https://sibi-api.vercel.app/agendamentos",
        ];

        const responses = await Promise.all(
          endpoints.map((url) => axios.get(url))
        );

        setStatsCounts({
          livrosCount: responses[0].data.length,
          emprestimosCount: responses[1].data.length,
          equipamentosCount: responses[2].data.length,
          agendamentosCount: responses[3].data.length,
        });
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <Menu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        livrosCount={statsCounts.livrosCount}
        emprestimosCount={statsCounts.emprestimosCount}
        equipamentosCount={statsCounts.equipamentosCount}
        agendamentosCount={statsCounts.agendamentosCount}
      />

      <div className="flex items-center justify-center flex-col py-5 w-full">
        {loading ? (
          <Loading />
        ) : (
          <StatsCard
            livrosCount={statsCounts.livrosCount}
            emprestimosCount={statsCounts.emprestimosCount}
            equipamentosCount={statsCounts.equipamentosCount}
            agendamentosCount={statsCounts.agendamentosCount}
          />
        )}
      </div>
    </>
  );
}
