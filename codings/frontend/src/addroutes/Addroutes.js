import { Routes, Route, Navigate } from "react-router-dom";
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
import LoginPage from "../components/Loginpage";
import AdminLayout from "../layouts/AdminLayout";
import CreateUserPage from "../components/CreateUser";
import StudentWorkUploadForm from "../pages/admin/StudentWorkSumbit";
import DailyquestionUpload from "../pages/admin/DailyquestionUpload";
import CourseGroup from "../pages/admin/CourseGroup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page Routes - Public */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<CourseCarousel />} />
        <Route path="PythonCoursesDetails" element={<PythonCourseDetails />} />
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

      {/* Login Page - Public */}
      <Route path="/LoginPage" element={<LoginPage />} />

      {/* Admin Pages - Now Public */}
      <Route path="/AdminLayout" element={<AdminLayout />}>
        <Route index element={<CreateUserPage />} />
        <Route path="CreateUserPage" element={<CreateUserPage />} />
        <Route path="Dailyquestions" element={<Dailyquestions />} />
        <Route
          path="StudentWorkUploadForm"
          element={<StudentWorkUploadForm />}
        />
        <Route path="DailyquestionUpload" element={<DailyquestionUpload />} />
        <Route path="CourseGroup" element={<CourseGroup />} />
      </Route>

      {/* User Dashboard Pages - Now Public */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="CourseTimeline" element={<CourseTimeline />} />
        <Route path="LeagueBoard" element={<LeagueBoard />} />
        <Route path="Dailyquestions" element={<Dailyquestions />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Projects" element={<StudentWorkPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
