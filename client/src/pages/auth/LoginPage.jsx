import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login Successful");

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

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
                  <label>Email</label>

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
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;