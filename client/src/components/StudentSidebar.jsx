import { Link, useLocation } from "react-router-dom";

function StudentSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/student",
      icon: "bi-speedometer2",
    },
    {
      title: "My Project",
      path: "/student/project",
      icon: "bi-folder-fill",
    },
    {
      title: "My Tasks",
      path: "/student/tasks",
      icon: "bi-list-check",
    },
    {
      title: "Progress",
      path: "/student/progress",
      icon: "bi-graph-up-arrow",
    },
    {
      title: "Profile",
      path: "/student/profile",
      icon: "bi-person-circle",
    },
  ];

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "calc(100vh - 70px)",
        background: "#0F172A",
        padding: "24px 18px",
        color: "white",
        position: "sticky",
        top: "70px",
      }}
    >
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Student Portal</h5>

        <small style={{ color: "#94A3B8" }}>
          Track your internship
        </small>
      </div>

      <div className="d-flex flex-column gap-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="text-decoration-none"
              style={{
                background: active ? "#2563EB" : "transparent",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: active ? "600" : "500",
                transition: "0.25s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "#1E293B";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <i className={`bi ${item.icon}`}></i>
              {item.title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default StudentSidebar;