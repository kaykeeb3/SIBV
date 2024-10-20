import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index";

import "./app.css";

export function App() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}
