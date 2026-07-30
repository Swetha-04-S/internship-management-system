import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      title: "Create Project",
      description: "Add a new internship project",
      path: "/admin/create-project",
      icon: "bi-folder-plus",
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      title: "Create Task",
      description: "Assign tasks to students",
      path: "/admin/create-task",
      icon: "bi-list-task",
      color: "#16A34A",
      bg: "#DCFCE7",
    },
    {
      title: "Review Work",
      description: "Review student submissions",
      path: "/reviews",
      icon: "bi-clipboard-check-fill",
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      title: "Students",
      description: "Manage registered students",
      path: "/students",
      icon: "bi-people-fill",
      color: "#7C3AED",
      bg: "#F3E8FF",
    },
  ];

  return (
    <div
      className="dashboard-card mb-4"
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
      }}
    >
      <div className="d-flex align-items-center mb-4">

        <div
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "16px",
            background: "#DBEAFE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="bi bi-lightning-charge-fill"
            style={{
              color: "#2563EB",
              fontSize: "24px",
            }}
          ></i>
        </div>

        <div className="ms-3">
          <h4 className="fw-bold mb-1">
            Quick Actions
          </h4>

          <small className="text-muted">
            Frequently used coordinator actions
          </small>
        </div>

      </div>

      <div className="row g-4">

        {actions.map((action, index) => (

          <div
            className="col-lg-3 col-md-6"
            key={index}
          >

            <Link
              to={action.path}
              className="text-decoration-none"
            >

              <div
                className="dashboard-card h-100"
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "20px",
                }}
              >

                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    background: action.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`bi ${action.icon}`}
                    style={{
                      color: action.color,
                      fontSize: "28px",
                    }}
                  ></i>
                </div>

                <h5
                  className="fw-bold mt-4 mb-2"
                  style={{
                    color: "#1E293B",
                  }}
                >
                  {action.title}
                </h5>

                <p
                  className="text-muted"
                  style={{
                    minHeight: "45px",
                    fontSize: "14px",
                  }}
                >
                  {action.description}
                </p>

                <div
                  className="fw-semibold mt-3"
                  style={{
                    color: action.color,
                  }}
                >
                  Open
                  <i className="bi bi-arrow-right ms-2"></i>
                </div>

              </div>

            </Link>

          </div>

        ))}

      </div>
    </div>
  );
}

export default QuickActions;