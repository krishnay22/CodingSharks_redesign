import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <SideNav />
      <main className="flex-grow-1 p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
