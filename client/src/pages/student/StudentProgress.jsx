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

      {/* Header */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Internship Progress
        </h2>

        <p className="text-muted mb-0">
          Track your internship performance, completed tasks and coordinator feedback.
        </p>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-lg-3 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-primary">
                {progress.totalTasks}
              </h2>

              <p className="text-muted mb-0">
                Total Tasks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-success">
                {progress.reviewedTasks}
              </h2>

              <p className="text-muted mb-0">
                Reviewed Tasks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-warning">
                {averageMarks}
              </h2>

              <p className="text-muted mb-0">
                Average Marks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-danger">
                {progress.progress}%
              </h2>

              <p className="text-muted">
                Overall Progress
              </p>

              <div
                className="progress"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progress.progress}%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Reviews */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Submission History
          </h4>

          {submissions.length === 0 ? (

            <div className="alert alert-info">
              No submissions available yet.
            </div>

          ) : (

            submissions.map((submission, index) => (

              <div
                key={submission._id || index}
                className="border rounded p-3 mb-3"
              >

                <div className="d-flex justify-content-between align-items-center flex-wrap">

                  <div>

                    <h5 className="fw-bold mb-1">
                      {submission.task?.title || "Task"}
                    </h5>

                    <small className="text-muted">
                      Submitted on{" "}
                      {new Date(
                        submission.createdAt
                      ).toLocaleDateString()}
                    </small>

                  </div>

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

                <div className="row">

                  <div className="col-md-3 mb-3">

                    <strong>Marks</strong>

                    <br />

                    <span className="badge bg-primary mt-2 fs-6">
                      {submission.marks ?? "-"}
                    </span>

                  </div>

                  <div className="col-md-9">

                    <strong>Coordinator Feedback</strong>

                    <p className="mt-2 mb-0">
                      {submission.feedback ||
                        "Awaiting Review"}
                    </p>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </StudentLayout>
  );
}

export default StudentProgress;