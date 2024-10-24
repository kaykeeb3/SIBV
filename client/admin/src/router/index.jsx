import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Logs } from "../pages/logs/logs";
import { Login } from "../pages/auth/login";
import { Layout } from "../pages/home/_components/layout";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/logs",
        element: <Logs />,
      },
    ],
  },
]);
