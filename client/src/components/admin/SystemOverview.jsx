function SystemOverview({ stats }) {

    const completionRate =
      stats.tasks === 0
        ? 0
        : Math.round((stats.reviewed / stats.tasks) * 100);
  
    return (
      <div className="card shadow border-0 mb-4">
  
        <div className="card-body">
  
          <h4 className="mb-4">
            📈 System Overview
          </h4>
  
          <div className="row text-center">
  
            <div className="col-md-2">
              <h3>{stats.students}</h3>
              <p className="text-muted">
                Students
              </p>
            </div>
  
            <div className="col-md-2">
              <h3>{stats.projects}</h3>
              <p className="text-muted">
                Projects
              </p>
            </div>
  
            <div className="col-md-2">
              <h3>{stats.tasks}</h3>
              <p className="text-muted">
                Tasks
              </p>
            </div>
  
            <div className="col-md-2">
              <h3>{stats.reviewed}</h3>
              <p className="text-muted">
                Reviewed
              </p>
            </div>
  
            <div className="col-md-2">
              <h3>{stats.pendingReviews}</h3>
              <p className="text-muted">
                Pending
              </p>
            </div>
  
            <div className="col-md-2">
              <h3>{completionRate}%</h3>
              <p className="text-muted">
                Completion
              </p>
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default SystemOverview;