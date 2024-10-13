import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/home/_components/layout";
import { Home } from "../pages/home/home";
import { Book } from "../pages/book/book";
import { Request } from "../pages/request/request";
import { BookRegister } from "../pages/registrations/books/create-books";
import { RequestRegister } from "../pages/registrations/requests/create-request";
import { RegisterEquipment } from "../pages/registrations/equipments/create-equipments";
import { Equipment } from "../pages/equipment/equipment";
import { RegisterScheduling } from "../pages/registrations/schedulings/create-schedulings";
import { Scheduling } from "../pages/scheduling/scheduling";
import { Support } from "../pages/support/support";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/livros",
        element: <Book />,
      },
      {
        path: "/requisicoes",
        element: <Request />,
      },
      {
        path: "/agendamentos",
        element: <Scheduling />,
      },
      {
        path: "/equipamentos",
        element: <Equipment />,
      },
      {
        path: "/novo-livro",
        element: <BookRegister />,
      },
      {
        path: "/nova-requisicao",
        element: <RequestRegister />,
      },
      {
        path: "/novo-agendamento",
        element: <RegisterScheduling />,
      },
      {
        path: "/novo-equipamento",
        element: <RegisterEquipment />,
      },
      {
        path: "/suporte",
        element: <Support />,
      },
    ],
  },
]);
