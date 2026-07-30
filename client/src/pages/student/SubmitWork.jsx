import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StudentLayout from "../../layouts/StudentLayout";
import { createSubmission } from "../../services/submissionService";

function SubmitWork() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    githubLink: "",
    demoLink: "",
    comments: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (message) setMessage("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      student: user.id,
      task: taskId,
      githubLink: formData.githubLink,
      demoLink: formData.demoLink,
      comments: formData.comments,
    };

    const result = await createSubmission(submission);

    if (result.success) {
      setMessage("✅ Work submitted successfully!");

      setTimeout(() => {
        navigate("/student");
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <StudentLayout>

      {/* Header */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Submit Work
        </h2>

        <p className="text-muted mb-0">
          Submit your GitHub repository, demo link and additional comments.
        </p>

      </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                GitHub Repository
              </label>

              <input
                type="url"
                className="form-control"
                placeholder="https://github.com/username/project"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                required
              />

              <small className="text-muted">
                Share the public GitHub repository for your project.
              </small>

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Live Demo (Optional)
              </label>

              <input
                type="url"
                className="form-control"
                placeholder="https://your-demo-link.com"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
              />

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Comments
              </label>

              <textarea
                rows="5"
                className="form-control"
                placeholder="Write anything you'd like your coordinator to know..."
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />

            </div>

            <div className="d-flex justify-content-end">

              <button
                className="btn btn-success px-4"
                type="submit"
              >
                Submit Work
              </button>

            </div>

          </form>

        </div>

      </div>

    </StudentLayout>
  );
}

export default SubmitWork;