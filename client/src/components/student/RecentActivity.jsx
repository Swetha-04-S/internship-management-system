function RecentActivity({ submissions }) {

    if (!submissions || submissions.length === 0) {
      return (
        <div className="card shadow border-0 mb-4">
          <div className="card-body">
  
            <h4>🕒 Recent Activity</h4>
  
            <div className="alert alert-info mt-3 mb-0">
              No recent activity.
            </div>
  
          </div>
        </div>
      );
    }
  
    const latest = [...submissions].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];
  
    return (
      <div className="card shadow border-0 mb-4">
  
        <div className="card-body">
  
          <h4 className="mb-4">
            🕒 Recent Activity
          </h4>
  
          <div className="list-group">
  
            <div className="list-group-item">
              ✅ Submitted <strong>{latest.task?.title}</strong>
            </div>
  
            {latest.status === "Reviewed" && (
              <>
                <div className="list-group-item">
                  🎯 Submission Reviewed
                </div>
  
                <div className="list-group-item">
                  ⭐ Marks Awarded: {latest.marks}
                </div>
  
                <div className="list-group-item">
                  💬 {latest.feedback}
                </div>
              </>
            )}
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default RecentActivity;