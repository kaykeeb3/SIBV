import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index";

export function App() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}
