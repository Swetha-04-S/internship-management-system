function DashboardStats({
    project,
    progress,
    averageMarks,
  }) {
    return (
      <div className="row mb-4">
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>📁</h1>
              <h6 className="text-muted">Current Project</h6>
              <h5>{project ? 1 : 0}</h5>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>📈</h1>
              <h6 className="text-muted">Progress</h6>
              <h5>{progress.progress}%</h5>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>⭐</h1>
              <h6 className="text-muted">Average Marks</h6>
              <h5>{averageMarks}</h5>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>✅</h1>
              <h6 className="text-muted">Reviewed Tasks</h6>
              <h5>
                {progress.reviewedTasks} / {progress.totalTasks}
              </h5>
            </div>
          </div>
        </div>
  
      </div>
    );
  }
  
  export default DashboardStats;