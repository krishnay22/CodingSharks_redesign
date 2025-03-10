import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/Dashboard";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />{" "}
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
