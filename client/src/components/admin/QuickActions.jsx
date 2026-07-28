import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="card shadow border-0 mb-4">

      <div className="card-body">

        <h4 className="mb-4">⚡ Quick Actions</h4>

        <div className="row">

          <div className="col-md-3 mb-3">
            <Link
              to="/admin/create-project"
              className="btn btn-primary w-100"
            >
              ➕ Create Project
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/admin/create-task"
              className="btn btn-success w-100"
            >
              📝 Create Task
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/reviews"
              className="btn btn-warning w-100"
            >
              📋 Review Work
            </Link>
          </div>

          <div className="col-md-3 mb-3">
            <Link
              to="/students"
              className="btn btn-info w-100 text-white"
            >
              👨‍🎓 View Students
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickActions;