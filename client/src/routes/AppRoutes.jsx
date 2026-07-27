import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";

import Students from "../pages/admin/Students";
import CreateProject from "../pages/admin/CreateProject";
import CreateTask from "../pages/admin/CreateTask";
import SubmitWork from "../pages/student/SubmitWork";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Coordinator */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/admin/create-project" element={<CreateProject />} />
        <Route path="/admin/create-task" element={<CreateTask />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route
          path="/student/submit-work/:taskId"
          element={<SubmitWork />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;