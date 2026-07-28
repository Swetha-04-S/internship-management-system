function InternshipJourney({ project, tasks, submissions, progress }) {

    const steps = [
      {
        title: "Joined Internship",
        completed: true,
      },
      {
        title: "Project Assigned",
        completed: !!project,
      },
      {
        title: "Task Assigned",
        completed: tasks.length > 0,
      },
      {
        title: "Work Submitted",
        completed: submissions.length > 0,
      },
      {
        title: "Reviewed",
        completed: progress.reviewedTasks > 0,
      },
      {
        title: "Internship Completed",
        completed:
          progress.totalTasks > 0 &&
          progress.reviewedTasks === progress.totalTasks,
      },
    ];
  
    return (
      <div className="card shadow border-0 mb-4">
  
        <div className="card-body">
  
          <h4 className="mb-4">
            🛤 Internship Journey
          </h4>
  
          {steps.map((step, index) => (
  
            <div
              key={index}
              className="d-flex align-items-center mb-3"
            >
  
              <div
                style={{
                  width: "40px",
                  fontSize: "22px",
                }}
              >
                {step.completed ? "✅" : "⬜"}
              </div>
  
              <div>
  
                <strong>
                  {step.title}
                </strong>
  
              </div>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default InternshipJourney;