import { Link, useLocation } from "react-router-dom";

function CoordinatorSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: "bi-speedometer2",
    },
    {
      title: "Students",
      path: "/students",
      icon: "bi-people-fill",
    },
    {
      title: "Projects",
      path: "/admin/create-project",
      icon: "bi-folder-fill",
    },
    {
      title: "Tasks",
      path: "/admin/create-task",
      icon: "bi-list-check",
    },
    {
      title: "Reviews",
      path: "/reviews",
      icon: "bi-clipboard-check-fill",
    },
    {
      title: "Announcements",
      path: "/admin/announcements",
      icon: "bi-megaphone-fill",
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "bi-bar-chart-fill",
    },
    {
      title: "Profile",
      path: "/admin/profile",
      icon: "bi-person-circle",
    },
  ];

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "calc(100vh - 70px)",
        background: "#0F172A",
        color: "white",
        padding: "24px 18px",
        position: "sticky",
        top: "70px",
      }}
    >
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Coordinator Panel</h5>
        <small style={{ color: "#94A3B8" }}>
          Manage internships efficiently
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
                transition: "0.25s",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: active ? "600" : "500",
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

export default CoordinatorSidebar;