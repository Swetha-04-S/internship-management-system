import DashboardLayout from "../../components/DashboardLayout";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <h2 className="mb-4">Coordinator Dashboard</h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Students</h6>
              <h2>25</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Active Projects</h6>
              <h2>12</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pending Reviews</h6>
              <h2>8</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Completed Internships</h6>
              <h2>14</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm border-0 mt-4">

        <div className="card-header bg-white">
          <h5 className="mb-0">Recent Students</h5>
        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead>

              <tr>
                <th>Name</th>
                <th>College</th>
                <th>Project</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>Swetha</td>
                <td>Saveetha Engineering College</td>
                <td>InternFlow Portal</td>
                <td>
                  <span className="badge bg-success">
                    Active
                  </span>
                </td>
              </tr>

              <tr>
                <td>Rahul</td>
                <td>Anna University</td>
                <td>AI Chatbot</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    Review Pending
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;