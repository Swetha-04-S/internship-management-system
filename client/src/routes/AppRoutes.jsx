import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

import StudentPortal from "../pages/StudentPortal";
import CoordinatorRegisterPage from "../pages/auth/CoordinatorRegisterPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import CreateProject from "../pages/admin/CreateProject";
import CreateTask from "../pages/admin/CreateTask";
import ReviewSubmissions from "../pages/admin/ReviewSubmissions";
import Announcements from "../pages/admin/Announcements";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentProject from "../pages/student/StudentProject";
import StudentTasks from "../pages/student/StudentTasks";
import StudentProgress from "../pages/student/StudentProgress";
import StudentProfile from "../pages/student/StudentProfile";
import SubmitWork from "../pages/student/SubmitWork";
import Reports from "../pages/admin/Reports";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminProfile from "../pages/admin/AdminProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/coordinator/register" element={<CoordinatorRegisterPage />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-project"
          element={
            <ProtectedRoute role="admin">
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-task"
          element={
            <ProtectedRoute role="admin">
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute role="admin">
              <ReviewSubmissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute role="admin">
              <Announcements />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ROUTES ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/project"
          element={
            <ProtectedRoute role="student">
              <StudentProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/tasks"
          element={
            <ProtectedRoute role="student">
              <StudentTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/progress"
          element={
            <ProtectedRoute role="student">
              <StudentProgress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/submit-work/:taskId"
          element={
            <ProtectedRoute role="student">
              <SubmitWork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;