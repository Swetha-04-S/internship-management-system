function UpcomingDeadline({ tasks }) {
    if (!tasks || tasks.length === 0) {
      return (
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <h4>📅 Upcoming Deadline</h4>
  
            <div className="alert alert-info mt-3 mb-0">
              No upcoming tasks.
            </div>
          </div>
        </div>
      );
    }
  
    // Find the earliest task
    const upcomingTask = [...tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    )[0];
  
    const dueDate = new Date(upcomingTask.dueDate);
  
    const today = new Date();
  
    const difference =
      Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  
    return (
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
  
          <h4 className="mb-4">
            📅 Upcoming Deadline
          </h4>
  
          <h5>{upcomingTask.title}</h5>
  
          <p className="text-muted">
            Due on {dueDate.toLocaleDateString()}
          </p>
  
          <h3 className="text-danger">
            {difference >= 0
              ? `${difference} Days Remaining`
              : "Deadline Passed"}
          </h3>
  
        </div>
      </div>
    );
  }
  
  export default UpcomingDeadline;