import { Link } from "react-router-dom";

function CoordinatorSidebar() {
  return (
    <div
      className="bg-light border-end p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">
        Coordinator
      </h4>

      <div className="d-grid gap-2">

        <Link
          className="btn btn-outline-primary"
          to="/admin"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/students"
        >
          Students
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/admin/create-project"
        >
          Create Project
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/admin/create-task"
        >
          Create Task
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/reviews"
        >
          Reviews
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/reports"
        >
          Reports
        </Link>

      </div>
    </div>
  );
}

export default CoordinatorSidebar;