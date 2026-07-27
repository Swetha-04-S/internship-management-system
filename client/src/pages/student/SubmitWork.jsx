import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/DashboardLayout";
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

      setMessage("Work Submitted Successfully");

      setTimeout(() => {
        navigate("/student");
      }, 1500);

    } else {

      setError(result.message);

    }

  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">
        Submit Work
      </h2>

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

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>GitHub Repository</label>

          <input
            type="url"
            className="form-control"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>Live Demo</label>

          <input
            type="url"
            className="form-control"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Comments</label>

          <textarea
            className="form-control"
            rows="4"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />

        </div>

        <button className="btn btn-success">
          Submit Work
        </button>

      </form>

    </DashboardLayout>
  );

}

export default SubmitWork;