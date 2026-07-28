function AdminStats({ stats }) {

    return (
  
      <div className="row mb-4">
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>👨‍🎓</h1>
              <h5>{stats.students}</h5>
              <p className="text-muted mb-0">
                Students
              </p>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>📁</h1>
              <h5>{stats.projects}</h5>
              <p className="text-muted mb-0">
                Projects
              </p>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>📝</h1>
              <h5>{stats.tasks}</h5>
              <p className="text-muted mb-0">
                Tasks
              </p>
            </div>
          </div>
        </div>
  
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h1>⏳</h1>
              <h5>{stats.pendingReviews}</h5>
              <p className="text-muted mb-0">
                Pending Reviews
              </p>
            </div>
          </div>
        </div>
  
      </div>
  
    );
  }
  
  export default AdminStats;