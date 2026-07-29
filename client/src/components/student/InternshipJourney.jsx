function InternshipJourney({
    project,
    tasks,
    submissions,
    progress,
  }) {
    const steps = [
      {
        title: "Joined Internship",
        description: "Successfully registered in the internship.",
        completed: true,
        icon: "bi-person-check-fill",
      },
      {
        title: "Project Assigned",
        description: "Project has been assigned.",
        completed: !!project,
        icon: "bi-folder-fill",
      },
      {
        title: "Task Assigned",
        description: "Tasks are available to complete.",
        completed: tasks.length > 0,
        icon: "bi-list-check",
      },
      {
        title: "Work Submitted",
        description: "Submitted at least one task.",
        completed: submissions.length > 0,
        icon: "bi-upload",
      },
      {
        title: "Reviewed",
        description: "Coordinator reviewed your work.",
        completed: progress.reviewedTasks > 0,
        icon: "bi-clipboard-check-fill",
      },
      {
        title: "Internship Completed",
        description: "All assigned tasks reviewed.",
        completed:
          progress.totalTasks > 0 &&
          progress.reviewedTasks === progress.totalTasks,
        icon: "bi-trophy-fill",
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
              className="bi bi-signpost-split-fill"
              style={{
                color: "#2563EB",
                fontSize: "24px",
              }}
            ></i>
          </div>
  
          <div className="ms-3">
            <h4 className="fw-bold mb-1">
              Internship Journey
            </h4>
  
            <small className="text-muted">
              Track your internship progress
            </small>
          </div>
  
        </div>
  
        {steps.map((step, index) => (
          <div
            key={index}
            className="d-flex"
            style={{
              position: "relative",
              marginBottom: index !== steps.length - 1 ? "28px" : "0",
            }}
          >
            {/* Timeline */}
            <div
              className="d-flex flex-column align-items-center me-3"
              style={{ width: "36px" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: step.completed
                    ? "#16A34A"
                    : "#E2E8F0",
                  color: step.completed ? "#fff" : "#94A3B8",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i className={`bi ${step.icon}`}></i>
              </div>
  
              {index !== steps.length - 1 && (
                <div
                  style={{
                    width: "3px",
                    flexGrow: 1,
                    background: step.completed
                      ? "#16A34A"
                      : "#E2E8F0",
                    minHeight: "35px",
                  }}
                />
              )}
            </div>
  
            {/* Content */}
            <div className="pb-2">
              <h6
                className="fw-bold mb-1"
                style={{
                  color: step.completed
                    ? "#1E293B"
                    : "#94A3B8",
                }}
              >
                {step.title}
              </h6>
  
              <small className="text-muted">
                {step.description}
              </small>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default InternshipJourney;