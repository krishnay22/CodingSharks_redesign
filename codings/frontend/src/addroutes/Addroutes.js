import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming your auth context has user and isAdmin properties
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

// Protected route components
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if user is not logged in
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // Redirect to login if user is not logged in
    return <Navigate to="/LoginPage" replace />;
  }

  if (!isAdmin) {
    // Redirect to dashboard if user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

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

      {/* Admin Only Routes */}

      <Route
        path="/AdminLayout"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<CreateUserPage />} />
        <Route path="Dailyquestions" element={<Dailyquestions />} />
        <Route
          path="StudentWorkUploadForm"
          element={<StudentWorkUploadForm />}
        />
        <Route path="DailyquestionUpload" element={<DailyquestionUpload />} />
        <Route path="CourseGroup" element={<CourseGroup />} />
      </Route>

      {/* User Dashboard Routes - Protected (any logged in user) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="CourseTimeline" element={<CourseTimeline />} />
        <Route path="LeagueBoard" element={<LeagueBoard />} />

        <Route path="Dailyquestions" element={<Dailyquestions />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Projects" element={<StudentWorkPage />} />
      </Route>

      {/* Catch-all route for undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
