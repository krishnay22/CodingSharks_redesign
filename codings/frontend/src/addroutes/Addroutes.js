import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/Dashboard";
import CourseTimeline from "../pages/user/CourseTimeline";
import LeagueBoard from "../pages/user/LeagueBoard";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="CourseTimeline" element={<CourseTimeline />} />
          <Route path="LeagueBoard" element={<LeagueBoard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
