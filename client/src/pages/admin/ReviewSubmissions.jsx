import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

import {
  getSubmissions,
  reviewSubmission,
} from "../../services/submissionService";

function ReviewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState(null);

  const [reviewData, setReviewData] = useState({
    marks: "",
    feedback: "",
  });

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openReviewModal = (submission) => {
    setSelectedSubmission(submission);

    setReviewData({
      marks: "",
      feedback: "",
    });

    setShowModal(true);
  };

  const saveReview = async () => {
    if (!reviewData.marks || !reviewData.feedback) {
      alert("Please enter marks and feedback.");
      return;
    }

    const result = await reviewSubmission(
      selectedSubmission._id,
      reviewData
    );

    if (result.success) {
      alert("Review saved successfully!");

      setShowModal(false);

      loadSubmissions();
    } else {
      alert(result.message);
    }
  };

  const filteredSubmissions = submissions
    .filter(
      (submission) => 
        submission.student && 
        submission.task
    )
    .filter((submission) => {
      const matchesSearch =
        submission.student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        submission.student.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        submission.task.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        submission.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

        <div>

          <h2 className="fw-bold mb-1">
            Review Submissions
          </h2>

          <p className="text-muted mb-0">
            Review student submissions and provide
            marks & feedback.
          </p>

        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          {filteredSubmissions.length} Submission
          {filteredSubmissions.length !== 1
            ? "s"
            : ""}
        </span>

      </div>

      {/* Search & Filter */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by student, email or task..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="col-md-4">

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option>All</option>
                <option>Reviewed</option>
                <option>Submitted</option>
              </select>

            </div>

          </div>

        </div>

      </div>

      {filteredSubmissions.length === 0 ? (

        <div className="alert alert-info">
          No submissions found.
        </div>

      ) : (

        filteredSubmissions.map((submission) => (

          <div
            key={submission._id}
            className="card shadow-sm border-0 mb-4"
          >

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h5 className="fw-bold mb-1">
                    {submission.task.title}
                  </h5>

                  <small className="text-muted">
                    Task Submission
                  </small>

                </div>

                <span
                  className={`badge ${
                    submission.status ===
                    "Reviewed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {submission.status}
                </span>

              </div>

              <hr />

              <div className="d-flex align-items-center mb-3">

                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: 45,
                    height: 45,
                    fontWeight: "600",
                  }}
                >
                  {submission.student.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <div className="fw-semibold">
                    {submission.student.name}
                  </div>

                  <small className="text-muted">
                    {submission.student.email}
                  </small>

                </div>

              </div>

              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={submission.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 GitHub Repository
                </a>
              </p>

              <p>
                <strong>Demo:</strong>{" "}
                <a
                  href={submission.demoLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  🌐 Live Demo
                </a>
              </p>

              <p>
                <strong>Comments:</strong>{" "}
                {submission.comments}
              </p>

              {submission.status === "Reviewed" ? (

                <>
                  <p>
                    <strong>Marks:</strong>{" "}
                    <span className="badge bg-success fs-6">
                      {submission.marks}
                    </span>
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
                    openReviewModal(submission)
                  }
                >
                  Review Submission
                </button>

              )}

            </div>

          </div>

        ))

      )}

      {/* Review Modal */}

      {showModal && (

        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog modal-lg">

            <div className="modal-content shadow-lg border-0">

              <div className="modal-header">

                <h5 className="modal-title fw-bold">
                  Review Submission
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                />

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Marks
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Marks"
                    value={reviewData.marks}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        marks: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fe-semibold">
                    Feedback
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Write constructive feedback..."
                    value={reviewData.feedback}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        feedback: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success px-4"
                  onClick={saveReview}
                >
                  Save Review
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default ReviewSubmissions;