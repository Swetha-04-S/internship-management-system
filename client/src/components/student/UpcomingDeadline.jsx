function UpcomingDeadline({ tasks }) {
    if (!tasks || tasks.length === 0) {
      return (
        <div
          className="dashboard-card mb-4"
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
          }}
        >
          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                background: "#DBEAFE",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="bi bi-calendar-event-fill"
                style={{
                  fontSize: "22px",
                  color: "#2563EB",
                }}
              ></i>
            </div>
  
            <div className="ms-3">
              <h4 className="mb-0 fw-bold">
                Upcoming Deadline
              </h4>
  
              <small className="text-muted">
                You're all caught up!
              </small>
            </div>
          </div>
  
          <div className="alert alert-success mb-0">
            🎉 No upcoming tasks. Enjoy your free time!
          </div>
        </div>
      );
    }
  
    // Earliest task
    const upcomingTask = [...tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    )[0];
  
    const dueDate = new Date(upcomingTask.dueDate);
    const today = new Date();
  
    const difference = Math.ceil(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );
  
    let badgeColor = "#16A34A";
    let status = "On Track";
  
    if (difference <= 7) {
      badgeColor = "#F59E0B";
      status = "Due Soon";
    }
  
    if (difference <= 3) {
      badgeColor = "#DC2626";
      status = "Urgent";
    }
  
    if (difference < 0) {
      badgeColor = "#991B1B";
      status = "Overdue";
    }
  
    return (
      <div
        className="dashboard-card mb-4"
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "24px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
  
          <div className="d-flex align-items-center">
  
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "16px",
                background: "#DBEAFE",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="bi bi-calendar-event-fill"
                style={{
                  fontSize: "24px",
                  color: "#2563EB",
                }}
              ></i>
            </div>
  
            <div className="ms-3">
              <h4 className="mb-1 fw-bold">
                Upcoming Deadline
              </h4>
  
              <small className="text-muted">
                Next task to complete
              </small>
            </div>
  
          </div>
  
          <span
            className="badge"
            style={{
              background: badgeColor,
              color: "white",
              fontSize: "13px",
            }}
          >
            {status}
          </span>
  
        </div>
  
        <h4 className="fw-bold mb-2">
          {upcomingTask.title}
        </h4>
  
        <p className="text-muted mb-4">
          Due on <strong>{dueDate.toLocaleDateString()}</strong>
        </p>
  
        <div className="row text-center">
  
          <div className="col-md-4 mb-3">
            <h2
              className="fw-bold"
              style={{ color: badgeColor }}
            >
              {difference >= 0 ? difference : 0}
            </h2>
  
            <small className="text-muted">
              Days Left
            </small>
          </div>
  
          <div className="col-md-4 mb-3">
            <h2 className="fw-bold">
              {tasks.length}
            </h2>
  
            <small className="text-muted">
              Total Tasks
            </small>
          </div>
  
          <div className="col-md-4 mb-3">
            <h2 className="fw-bold">
              📌
            </h2>
  
            <small className="text-muted">
              Stay Consistent
            </small>
          </div>
  
        </div>
  
        {difference < 0 && (
          <div className="alert alert-danger mt-3 mb-0">
            ⚠️ This deadline has already passed.
          </div>
        )}
      </div>
    );
  }
  
  export default UpcomingDeadline;