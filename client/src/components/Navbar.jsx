import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav
            className="d-flex justify-content-between align-items-center px-4"
            style={{
                height: "70px",
                background: "#ffffff",
                borderBottom: "1px solid #E2E8F0",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            {/* Logo */}
            <div className="d-flex align-items-center">

                <img
                    src="/logo.png"
                    alt="InterFlow"
                    style={{
                        width: "58px",
                        height: "58px",
                        objectFit: "contain",
                    }}
                />

                <div>
                    <h5
                        className="mb-0 fw-bold"
                        style={{ color: "#1E293B" }}
                    >
                        InterFlow
                    </h5>

                    <small style={{ color: "#64748B" }}>
                        Internship Management Platform
                    </small>
                </div>

            </div>

            {/* Right Side */}
            <div className="d-flex align-items-center">

                <div className="text-end me-4">

                    <div
                        className="fw-semibold"
                        style={{ color: "#1E293B" }}
                    >
                        {user?.name}
                    </div>

                    <small style={{ color: "#64748B" }}>
                        {user?.role === "admin"
                            ? "Coordinator"
                            : "Student"}
                    </small>

                </div>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;