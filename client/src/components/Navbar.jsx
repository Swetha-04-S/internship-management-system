import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">
        InternFlow
      </span>

      <div className="d-flex align-items-center">

        <span className="text-white me-3">
          Welcome, {user?.name}
        </span>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;