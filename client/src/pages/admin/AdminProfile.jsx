import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    tasks: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAdmin(user);

    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!admin) {
    return (
      <DashboardLayout>
        <h3>Loading...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="text-center mb-4">

            <img
              src="https://ui-avatars.com/api/?name=Coordinator&background=6f42c1&color=fff&size=120"
              alt="Profile"
              className="rounded-circle mb-3"
            />

            <h3>{admin.name}</h3>

            <p className="text-muted">
              Internship Coordinator
            </p>

            <span className="badge bg-success">
              Active
            </span>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">
              <h6>Name</h6>
              <p>{admin.name}</p>
            </div>

            <div className="col-md-6">
              <h6>Email</h6>
              <p>{admin.email}</p>
            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-4 mb-3">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h2>{stats.projects}</h2>
                  <small>Projects Created</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h2>{stats.tasks}</h2>
                  <small>Tasks Created</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h2>{stats.students}</h2>
                  <small>Students Managed</small>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AdminProfile;