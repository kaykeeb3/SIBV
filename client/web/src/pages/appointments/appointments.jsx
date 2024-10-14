import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import { RequestService } from "../../services/request/request";
import { SchedulesService } from "../../services/schedules/schedules";

// Configurando o calendário para o Brasil
moment.locale("pt-br");
const localizer = momentLocalizer(moment);

// Paleta de cores para os eventos
const colors = {
  red: "#ef4444", // Vermelho 500
  yellow: "#fbbf24", // Amarelo 500
  green: "#22c55e", // Verde 500
  blue: "#3b82f6", // Azul 500
};

// Função para determinar uma cor aleatória
const getRandomColor = () => {
  const colorKeys = Object.keys(colors);
  return colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
};

export function Appointments() {
  const [events, setEvents] = useState([]);

  // Função para formatar as requisições
  const formatRequestsToEvents = (requests) => {
    return requests
      .filter(
        (request) => request.name && request.startDate && request.returnDate
      )
      .map((request) => ({
        title: request.name,
        start: new Date(request.startDate),
        end: new Date(request.returnDate),
        allDay: true,
        color: getRandomColor(), // Cor aleatória para requisições
      }));
  };

  // Função para formatar os agendamentos
  const formatSchedulesToEvents = (schedules) => {
    return schedules
      .filter(
        (schedule) => schedule.name && schedule.startDate && schedule.returnDate
      )
      .map((schedule) => ({
        title: schedule.name,
        start: new Date(schedule.startDate),
        end: new Date(schedule.returnDate),
        allDay: true,
        color: getRandomColor(), // Cor aleatória para agendamentos
      }));
  };

  // Função para buscar os eventos de requisições e agendamentos
  const fetchEvents = async () => {
    try {
      const [requests, schedules] = await Promise.all([
        RequestService.getAllRequests(),
        SchedulesService.getAllSchedules(),
      ]);
      const formattedRequests = formatRequestsToEvents(requests);
      const formattedSchedules = formatSchedulesToEvents(schedules);
      setEvents([...formattedRequests, ...formattedSchedules]);
    } catch (error) {
      console.error("Erro ao carregar os eventos:", error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        margin: "2px",
        borderRadius: "4px",
        padding: "5px 8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        fontWeight: 500,
        fontSize: "0.7em",
        display: "flex",
        justifyContent: "space-between",
      },
    };
  };

  const getDayEvents = (date) => {
    return events.filter((event) =>
      moment(event.start).isSame(moment(date), "day")
    );
  };

  const renderEvent = (event) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "#ffffff",
        borderRadius: "5px",
        gap: "5px",
      }}
    >
      <span style={{ fontSize: "0.8em" }}>{event.title}</span>
      <span style={{ fontSize: "0.8em" }}>
        {moment(event.end).format("DD/MM/YYYY")}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg py-4 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Calendário de Empréstimos e Agendamentos
        </h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, width: "100%" }}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            allDay: "Dia Todo",
            noEvents: "Sem eventos",
          }}
          dayPropGetter={() => ({
            style: {
              backgroundColor: "#ecf0f1",
              padding: "2px",
              border: "1px solid #bdc3c7",
              borderRadius: "2px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              margin: "4px 2px",
            },
          })}
          eventPropGetter={eventStyleGetter}
          popup
          views={["month", "week", "day"]}
          toolbar
          selectable
          components={{
            month: {
              dateHeader: ({ label }) => (
                <div
                  style={{ fontWeight: 600, color: "#000", paddingTop: "5px" }}
                >
                  {label}
                </div>
              ),
            },
            event: ({ event }) => renderEvent(event),
          }}
          onShowMore={(events, date) => {
            const visibleEvents = getDayEvents(date).slice(0, 2);
            const hiddenEvents =
              getDayEvents(date).length - visibleEvents.length;
            const message = `${hiddenEvents} eventos a mais neste dia:`;
            console.log(message, date, events);
          }}
        />
      </div>
    </div>
  );
}
