function AdminStats({ stats }) {
    const cards = [
      {
        title: "Students",
        value: stats.students,
        subtitle: "Registered Students",
        icon: "bi-people-fill",
        color: "#2563EB",
        bg: "#EFF6FF",
      },
      {
        title: "Projects",
        value: stats.projects,
        subtitle: "Active Projects",
        icon: "bi-folder-fill",
        color: "#7C3AED",
        bg: "#F3E8FF",
      },
      {
        title: "Tasks",
        value: stats.tasks,
        subtitle: "Tasks Created",
        icon: "bi-list-check",
        color: "#F59E0B",
        bg: "#FEF3C7",
      },
      {
        title: "Pending Reviews",
        value: stats.pendingReviews,
        subtitle: "Awaiting Review",
        icon: "bi-clipboard-check-fill",
        color: "#16A34A",
        bg: "#DCFCE7",
      },
    ];
  
    return (
      <div className="row g-4 mb-4">
        {cards.map((card, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div
              className="dashboard-card h-100"
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 10px 25px rgba(15,23,42,.08)",
                transition: ".3s",
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
                    {card.title}
                  </p>
  
                  <h2
                    className="fw-bold mb-1"
                    style={{ color: "#1E293B" }}
                  >
                    {card.value}
                  </h2>
  
                  <small className="text-muted">
                    {card.subtitle}
                  </small>
  
                </div>
  
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "18px",
                    background: card.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className={`bi ${card.icon}`}
                    style={{
                      color: card.color,
                      fontSize: "28px",
                    }}
                  ></i>
                </div>
  
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default AdminStats;