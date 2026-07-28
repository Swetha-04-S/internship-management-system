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
  const [selectedSubmission, setSelectedSubmission] = useState(null);

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
      alert("Review Saved Successfully");

      setShowModal(false);

      loadSubmissions();
    } else {
      alert(result.message);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
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

      <h2 className="mb-4">Review Submissions</h2>

      {/* Search & Filter */}
      <div className="row mb-4">

        <div className="col-md-8">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by student, email or task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

                <h5>{submission.task.title}</h5>

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

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
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

                  <label className="form-label">
                    Marks
                  </label>

                  <input
                    type="number"
                    className="form-control"
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

                  <label className="form-label">
                    Feedback
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
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
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
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