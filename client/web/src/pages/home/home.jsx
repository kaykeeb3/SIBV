import React, { useState, useEffect } from "react";
import { Menu } from "../home/_components/menu";
import { Loading } from "../home/_components/loading";
import { StatsCard } from "../home/_components/stats-card";
import { HomeService } from "../../services/home/home";
import moment from "moment";
import "moment/locale/pt-br";

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statsCounts, setStatsCounts] = useState({
    bookCount: 0,
    loanCount: 0,
    equipmentCount: 0,
    scheduleCount: 0,
  });
  const [loanTrend, setLoanTrend] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [loans, setLoans] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [books, loansData, equipments, schedulesData] = await Promise.all(
          [
            HomeService.getAllBooks(),
            HomeService.getAllRequests(),
            HomeService.getAllEquipments(),
            HomeService.getAllSchedules(),
          ]
        );

        // Dados para os contadores
        setStatsCounts({
          bookCount: books.length,
          loanCount: loansData.length,
          equipmentCount: equipments.length,
          scheduleCount: schedulesData.length,
        });

        // Atualiza as listas de empréstimos e agendamentos
        setLoans(loansData);
        setSchedules(schedulesData);

        // Tendência de empréstimos
        const loanTrendData = loansData.reduce((acc, loan) => {
          const month = moment(loan.startDate).locale("pt-br").format("MMM");
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        setLoanTrend(
          Object.entries(loanTrendData).map(([label, value]) => ({
            label,
            value,
          }))
        );

        // Dados para uso ao longo do tempo
        const usageByMonth = loansData.reduce((acc, loan) => {
          const month = moment(loan.startDate).locale("pt-br").format("MMM");
          acc[month] = acc[month] || { books: 0, loans: 0, equipments: 0 };
          acc[month].loans += 1;
          return acc;
        }, {});

        books.forEach((book) => {
          const month = moment(book.createdAt).locale("pt-br").format("MMM");
          usageByMonth[month] = usageByMonth[month] || {
            books: 0,
            loans: 0,
            equipments: 0,
          };
          usageByMonth[month].books += 1;
        });

        equipments.forEach((equipment) => {
          const month = moment(equipment.createdAt)
            .locale("pt-br")
            .format("MMM");
          usageByMonth[month] = usageByMonth[month] || {
            books: 0,
            loans: 0,
            equipments: 0,
          };
          usageByMonth[month].equipments += 1;
        });

        setUsageData(
          Object.entries(usageByMonth).map(([label, data]) => ({
            label,
            ...data,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <StatsCard
        bookCount={statsCounts.bookCount}
        loanCount={statsCounts.loanCount}
        equipmentCount={statsCounts.equipmentCount}
        scheduleCount={statsCounts.scheduleCount}
        loanTrend={loanTrend}
        usageData={usageData}
        loans={loans}
        schedules={schedules}
      />
    </div>
  );
}
