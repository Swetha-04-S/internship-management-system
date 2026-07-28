import { useEffect, useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";
import { getProgress } from "../../services/progressService";
import { getStudentSubmissions } from "../../services/submissionService";

function StudentProgress() {
  const [progress, setProgress] = useState({
    progress: 0,
    totalTasks: 0,
    reviewedTasks: 0,
  });

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const progressData = await getProgress(user.id);
      setProgress(progressData);

      const submissionData = await getStudentSubmissions(user.id);
      setSubmissions(submissionData || []);
    } catch (error) {
      console.error(error);
    }
  };

  const averageMarks =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (total, submission) => total + (submission.marks || 0),
            0
          ) / submissions.length
        )
      : 0;

  return (
    <StudentLayout>
      <h2 className="mb-4">Internship Progress</h2>

      {/* Progress Card */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <h4>Overall Progress</h4>

          <div
            className="progress mt-3 mb-4"
            style={{ height: "30px" }}
          >
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progress.progress}%` }}
            >
              {progress.progress}%
            </div>
          </div>

          <div className="row text-center">

            <div className="col-md-4">
              <h6>Total Tasks</h6>
              <h3>{progress.totalTasks}</h3>
            </div>

            <div className="col-md-4">
              <h6>Reviewed Tasks</h6>
              <h3>{progress.reviewedTasks}</h3>
            </div>

            <div className="col-md-4">
              <h6>Average Marks</h6>
              <h3>{averageMarks}</h3>
            </div>

          </div>
        </div>
      </div>

      {/* Feedback Card */}
      <div className="card shadow border-0">
        <div className="card-body">

          <h4 className="mb-4">Latest Reviews</h4>

          {submissions.length === 0 ? (
            <div className="alert alert-info">
              No submissions available.
            </div>
          ) : (
            submissions.map((submission, index) => (
              <div
                key={submission._id || index}
                className="border rounded p-3 mb-3"
              >
                <div className="d-flex justify-content-between align-items-center">

                  <strong>
                    {submission.task?.title || "Task"}
                  </strong>

                  <span
                    className={`badge ${
                      submission.status === "Reviewed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {submission.status}
                  </span>

                </div>

                <hr />

                <p>
                  <strong>Marks:</strong>{" "}
                  {submission.marks ?? "-"}
                </p>

                <p>
                  <strong>Feedback:</strong>{" "}
                  {submission.feedback || "Awaiting Review"}
                </p>

                <small className="text-muted">
                  Submitted on{" "}
                  {new Date(
                    submission.createdAt
                  ).toLocaleDateString()}
                </small>

              </div>
            ))
          )}

        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentProgress;