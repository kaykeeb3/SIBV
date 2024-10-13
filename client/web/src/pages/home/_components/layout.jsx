import { Outlet } from "react-router-dom";
import { Menu } from "./menu";

export function Layout() {
  return (
    <div className="flex-1">
      <Menu />
      <div className="flex-grow  w-full">
        <Outlet />
      </div>
    </div>
  );
}
