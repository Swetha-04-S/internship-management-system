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
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">

                                    <div
                                        className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", fontSize: "28px" }}
                                    >
                                        📁
                                    </div>

                                    <h2 className="fw-bold">{stats.projects}</h2>
                                    <p className="text-muted mb-0">
                                        Projects Created
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">

                                    <div
                                        className="rounded-circle bg-warning bg-opacity-10 text-warning mx-auto mb-3 d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", fontSize: "28px" }}
                                    >
                                        📝
                                    </div>

                                    <h2 className="fw-bold">{stats.tasks}</h2>
                                    <p className="text-muted mb-0">
                                        Tasks Created
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">

                                    <div
                                        className="rounded-circle bg-success bg-opacity-10 text-success mx-auto mb-3 d-flex align-items-center justify-content-center"
                                        style={{ width: "65px", height: "65px", fontSize: "28px" }}
                                    >
                                        👨‍🎓
                                    </div>

                                    <h2 className="fw-bold">{stats.students}</h2>
                                    <p className="text-muted mb-0">
                                        Students Managed
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Recent Activity */}

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">
                                Recent Activity
                            </h4>

                            <div className="mb-3">
                                ✅ Created a new internship project
                            </div>

                            <div className="mb-3">
                                📢 Published an announcement
                            </div>

                            <div className="mb-3">
                                📝 Added a new task for students
                            </div>

                            <div>
                                👨‍🎓 Assigned projects to interns
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default AdminProfile;