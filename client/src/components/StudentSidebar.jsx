import { Link, useLocation } from "react-router-dom";

function StudentSidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "btn btn-success"
      : "btn btn-outline-success";
  };

  return (
    <div
      className="bg-light border-end p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Student</h4>

      <div className="d-grid gap-2">

        <Link
          className={isActive("/student")}
          to="/student"
        >
          Dashboard
        </Link>

        <Link
          className={isActive("/student/project")}
          to="/student/project"
        >
          My Project
        </Link>

        <Link
          className={isActive("/student/tasks")}
          to="/student/tasks"
        >
          My Tasks
        </Link>

        <Link
          className={isActive("/student/progress")}
          to="/student/progress"
        >
          Progress
        </Link>

        <Link
          className={isActive("/student/profile")}
          to="/student/profile"
        >
          Profile
        </Link>

      </div>
    </div>
  );
}

export default StudentSidebar;