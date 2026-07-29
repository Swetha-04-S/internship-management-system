function DashboardStats({
    project,
    progress,
    averageMarks,
  }) {
    const stats = [
      {
        title: "Current Project",
        value: project ? "1 Active" : "No Project",
        icon: "bi-folder-fill",
        color: "#2563EB",
        bg: "#EFF6FF",
      },
      {
        title: "Progress",
        value: `${progress.progress}%`,
        icon: "bi-graph-up-arrow",
        color: "#7C3AED",
        bg: "#F3E8FF",
      },
      {
        title: "Average Marks",
        value: averageMarks,
        icon: "bi-star-fill",
        color: "#F59E0B",
        bg: "#FEF3C7",
      },
      {
        title: "Reviewed Tasks",
        value: `${progress.reviewedTasks}/${progress.totalTasks}`,
        icon: "bi-check2-circle",
        color: "#16A34A",
        bg: "#DCFCE7",
      },
    ];
  
    return (
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div
              className="dashboard-card h-100"
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                transition: "0.3s",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
  
                <div>
                  <p
                    className="mb-2"
                    style={{
                      color: "#64748B",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {stat.title}
                  </p>
  
                  <h3
                    className="fw-bold mb-0"
                    style={{ color: "#1E293B" }}
                  >
                    {stat.value}
                  </h3>
                </div>
  
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    background: stat.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`bi ${stat.icon}`}
                    style={{
                      color: stat.color,
                      fontSize: "26px",
                    }}
                  ></i>
                </div>
  
              </div>
  
              {stat.title === "Progress" && (
                <>
                  <div
                    className="progress mt-4"
                    style={{
                      height: "8px",
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${progress.progress}%`,
                        background: "#7C3AED",
                      }}
                    ></div>
                  </div>
  
                  <small
                    className="text-muted mt-2 d-block"
                  >
                    Internship Completion
                  </small>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default DashboardStats;