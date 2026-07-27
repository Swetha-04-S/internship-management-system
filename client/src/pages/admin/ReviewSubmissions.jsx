import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import {
  getSubmissions,
  reviewSubmission,
} from "../../services/submissionService";

function ReviewSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const data = await getSubmissions();
    setSubmissions(data);
  };

  const handleReview = async (id) => {
    const marks = prompt("Enter Marks");

    if (marks === null) return;

    const feedback = prompt("Enter Feedback");

    if (feedback === null) return;

    const result = await reviewSubmission(id, {
      marks,
      feedback,
    });

    if (result.success) {
      alert("Review Saved Successfully");
      loadSubmissions();
    } else {
      alert(result.message);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Review Submissions</h2>

      {submissions.length === 0 ? (
        <div className="alert alert-info">
          No submissions available.
        </div>
      ) : (
        submissions.map((submission) => (
          <div
            key={submission._id}
            className="card shadow-sm mb-4"
          >
            <div className="card-body">

              <h5>{submission.task.title}</h5>

              <p>
                <strong>Student:</strong>{" "}
                {submission.student.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {submission.student.email}
              </p>

              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={submission.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Repository
                </a>
              </p>

              <p>
                <strong>Demo:</strong>{" "}
                <a
                  href={submission.demoLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Demo
                </a>
              </p>

              <p>
                <strong>Comments:</strong>{" "}
                {submission.comments}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    submission.status === "Reviewed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {submission.status}
                </span>
              </p>

              {submission.status === "Reviewed" ? (
                <>
                  <p>
                    <strong>Marks:</strong>{" "}
                    {submission.marks}
                  </p>

                  <p>
                    <strong>Feedback:</strong>{" "}
                    {submission.feedback}
                  </p>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleReview(submission._id)
                  }
                >
                  Review Submission
                </button>
              )}

            </div>
          </div>
        ))
      )}
    </DashboardLayout>
  );
}

export default ReviewSubmissions;