import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import LandingLayout from "../layouts/LandingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/user/Dashboard";
import CourseTimeline from "../pages/user/CourseTimeline";
import LeagueBoard from "../pages/user/LeagueBoard";
import CourseCarousel from "../components/CourseCarousel";
import PythonCourseDetails from "../components/homecomponents/PythonCourseDetails";
import MERNStackCourseDetails from "../components/homecomponents/MernCourseDetails";
import DataAnalystCourseDetails from "../components/homecomponents/DataanalystCoursedetails";
import AboutUsPage from "../components/homecomponents/AboutusPage";
import Dailyquestions from "../pages/user/DailyQuest";
import Profile from "../pages/user/Profil";
import StudentWorkPage from "../components/StudentsWork";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CourseCarousel />} />
          <Route
            path="PythonCoursesDetails"
            element={<PythonCourseDetails />}
          />
          <Route
            path="MERNStackCourseDetails"
            element={<MERNStackCourseDetails />}
          />

          <Route
            path="DataAnalystCourseDetails"
            element={<DataAnalystCourseDetails />}
          />
          <Route path="AboutUsPage" element={<AboutUsPage />} />
          <Route path="StudentWorkPage" element={<StudentWorkPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="CourseTimeline" element={<CourseTimeline />} />
          <Route path="LeagueBoard" element={<LeagueBoard />} />
          <Route path="Dailyquestions" element={<Dailyquestions />} />
          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
