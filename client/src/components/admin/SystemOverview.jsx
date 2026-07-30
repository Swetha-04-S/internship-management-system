function SystemOverview({ stats }) {
    const completionRate =
      stats.tasks === 0
        ? 0
        : Math.round((stats.reviewed / stats.tasks) * 100);
  
    const items = [
      {
        label: "Students",
        value: stats.students,
        icon: "bi-people-fill",
        color: "#2563EB",
      },
      {
        label: "Projects",
        value: stats.projects,
        icon: "bi-folder-fill",
        color: "#7C3AED",
      },
      {
        label: "Tasks",
        value: stats.tasks,
        icon: "bi-list-task",
        color: "#F59E0B",
      },
      {
        label: "Reviewed",
        value: stats.reviewed,
        icon: "bi-check-circle-fill",
        color: "#16A34A",
      },
      {
        label: "Pending",
        value: stats.pendingReviews,
        icon: "bi-hourglass-split",
        color: "#DC2626",
      },
      {
        label: "Completion",
        value: `${completionRate}%`,
        icon: "bi-graph-up-arrow",
        color: "#0EA5E9",
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
              background: "#E0F2FE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="bi bi-bar-chart-fill"
              style={{
                color: "#0284C7",
                fontSize: "24px",
              }}
            ></i>
          </div>
  
          <div className="ms-3">
            <h4 className="fw-bold mb-1">System Overview</h4>
            <small className="text-muted">
              Overall internship statistics
            </small>
          </div>
        </div>
  
        <div className="row g-4">
          {items.map((item) => (
            <div
              className="col-lg-2 col-md-4 col-6 text-center"
              key={item.label}
            >
              <i
                className={`bi ${item.icon}`}
                style={{
                  fontSize: "30px",
                  color: item.color,
                }}
              ></i>
  
              <h3 className="fw-bold mt-3 mb-1">
                {item.value}
              </h3>
  
              <small className="text-muted">
                {item.label}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SystemOverview;