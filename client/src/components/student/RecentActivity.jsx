function RecentActivity({ submissions }) {
    if (!submissions || submissions.length === 0) {
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
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                background: "#DBEAFE",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="bi bi-clock-history"
                style={{
                  fontSize: "24px",
                  color: "#2563EB",
                }}
              ></i>
            </div>
  
            <div className="ms-3">
              <h4 className="fw-bold mb-1">
                Recent Activity
              </h4>
  
              <small className="text-muted">
                Your latest internship updates
              </small>
            </div>
          </div>
  
          <div className="alert alert-info mb-0">
            No recent activity yet.
          </div>
        </div>
      );
    }
  
    const latest = [...submissions].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];
  
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
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "#DBEAFE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="bi bi-clock-history"
              style={{
                color: "#2563EB",
                fontSize: "24px",
              }}
            ></i>
          </div>
  
          <div className="ms-3">
            <h4 className="fw-bold mb-1">
              Recent Activity
            </h4>
  
            <small className="text-muted">
              Latest updates on your submissions
            </small>
          </div>
        </div>
  
        <div className="border rounded-4 p-3 mb-3 bg-light">
          <div className="d-flex align-items-center">
            <i className="bi bi-upload text-primary fs-4 me-3"></i>
  
            <div>
              <strong>
                {latest.task?.title}
              </strong>
  
              <div className="text-muted small">
                Submission Uploaded
              </div>
            </div>
          </div>
        </div>
  
        {latest.status === "Reviewed" && (
          <>
            <div className="border rounded-4 p-3 mb-3">
              <div className="d-flex justify-content-between">
  
                <span>
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
  
                  Review Status
                </span>
  
                <span className="badge bg-success">
                  Reviewed
                </span>
  
              </div>
            </div>
  
            <div className="row">
  
              <div className="col-md-6 mb-3">
  
                <div className="border rounded-4 p-3 text-center h-100">
  
                  <h2 className="text-warning">
                    ⭐
                  </h2>
  
                  <h5 className="fw-bold">
                    {latest.marks}
                  </h5>
  
                  <small className="text-muted">
                    Marks Awarded
                  </small>
  
                </div>
  
              </div>
  
              <div className="col-md-6 mb-3">
  
                <div className="border rounded-4 p-3 h-100">
  
                  <h6 className="fw-bold mb-2">
                    Feedback
                  </h6>
  
                  <p className="text-muted mb-0">
                    {latest.feedback || "No feedback available."}
                  </p>
  
                </div>
  
              </div>
  
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default RecentActivity;