import { Link } from "react-router-dom";

function StudentSidebar() {
  return (
    <div
      className="bg-light border-end p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">
        Student
      </h4>

      <div className="d-grid gap-2">

        <Link
          className="btn btn-outline-success"
          to="/student"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-outline-success"
          to="/student"
        >
          My Project
        </Link>

        <Link
          className="btn btn-outline-success"
          to="/student"
        >
          My Tasks
        </Link>

        <Link
          className="btn btn-outline-success"
          to="/student/progress"
        >
          Progress
        </Link>

        <Link
          className="btn btn-outline-success"
          to="/student/profile"
        >
          Profile
        </Link>

      </div>
    </div>
  );
}

export default StudentSidebar;