import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import SideNavforadmin from "../components/SideNavForAdmin";
const AdminLayout = () => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar with fixed width */}
      <SideNavforadmin />

      {/* Main content wrapper */}
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <main
          className="flex-grow-1 p-3 overflow-auto"
          style={{ marginLeft: "250px", minWidth: 0 }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
