import { useState } from "react";
import { registerUser } from "../../services/authService";

function CoordinatorRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      });

      setMessage(response.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div className="col-md-5">

        <div className="card shadow-lg border-0">

          <div className="card-body p-4">

            <h2
              className="text-center fw-bold"
              style={{ color: "#4B2E83" }}
            >
              INTERFLOW
            </h2>

            <p className="text-center text-muted mb-1">
              Coordinator Registration
            </p>

            <p
              className="text-center text-danger small mb-4"
            >
              Internal Use Only
            </p>

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Official Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? "Creating Coordinator..."
                  : "Create Coordinator"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CoordinatorRegisterPage;