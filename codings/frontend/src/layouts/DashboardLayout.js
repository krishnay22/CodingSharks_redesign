import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <SideNav />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
