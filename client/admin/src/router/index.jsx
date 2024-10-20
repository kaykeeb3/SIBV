import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Login } from "../pages/auth/login";
import { Dashboard } from "../pages/dashboard/dashboard";

export const Router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);
