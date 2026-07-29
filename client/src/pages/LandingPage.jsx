import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div className="text-center">

        <h1
          className="fw-bold mb-3"
          style={{
            color: "#4B2E83",
            fontSize: "55px",
          }}
        >
          INTERFLOW
        </h1>

        <p
          className="text-muted mb-5"
          style={{
            fontSize: "20px",
          }}
        >
          Internship Management System
        </p>

        <div className="row justify-content-center">

          <div className="col-md-5 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body p-5">

                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  👨‍💼
                </div>

                <h3 className="mt-3">
                  Coordinator
                </h3>

                <p className="text-muted">
                  Manage interns, assign projects,
                  review submissions and monitor progress.
                </p>

                <Link
                  to="/login"
                  className="btn btn-primary mt-3"
                >
                  Continue
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-5 mb-4">

            <div className="card shadow border-0 h-100">

              <div className="card-body p-5">

                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  👨‍🎓
                </div>

                <h3 className="mt-3">
                  Student
                </h3>

                <p className="text-muted">
                  View projects, complete tasks,
                  submit work and track progress.
                </p>

                <Link
                  to="/student-portal"
                  className="btn btn-success mt-3"
                >
                  Continue
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LandingPage;