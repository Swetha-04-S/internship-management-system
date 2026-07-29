import { Link } from "react-router-dom";

function StudentPortal() {
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
            color: "#198754",
          }}
        >
          INTERFLOW
        </h1>

        <h3 className="mb-5">
          Intern Portal
        </h3>

        <div className="row justify-content-center">

          <div className="col-md-5 mb-4">

            <div className="card shadow border-0">

              <div className="card-body p-5">

                <div style={{ fontSize: "55px" }}>
                  👤
                </div>

                <h4 className="mt-3">
                  Already Registered
                </h4>

                <p className="text-muted">
                  Login with your existing internship account.
                </p>

                <Link
                  to="/login"
                  className="btn btn-success mt-3"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

          <div className="col-md-5 mb-4">

            <div className="card shadow border-0">

              <div className="card-body p-5">

                <div style={{ fontSize: "55px" }}>
                  📝
                </div>

                <h4 className="mt-3">
                  New Intern
                </h4>

                <p className="text-muted">
                  Create a new internship account and begin your journey.
                </p>

                <Link
                  to="/register"
                  className="btn btn-primary mt-3"
                >
                  Register
                </Link>

              </div>

            </div>

          </div>

        </div>

        <Link
          to="/"
          className="btn btn-link mt-4"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default StudentPortal;