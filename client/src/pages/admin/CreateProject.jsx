import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { createProject } from "../../services/projectService";

function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    deadline: "",
    difficulty: "Beginner",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createProject(formData);

    if (data.success) {
      setMessage("Project Created Successfully");

      setFormData({
        title: "",
        description: "",
        duration: "",
        deadline: "",
        difficulty: "Beginner",
      });
    }
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">Create Project</h2>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Project Title</label>
          <input
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Duration</label>
          <input
            className="form-control"
            name="duration"
            placeholder="30 Days"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Deadline</label>
          <input
            type="date"
            className="form-control"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Difficulty</label>

          <select
            className="form-control"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

        </div>

        <button className="btn btn-primary">
          Create Project
        </button>

      </form>

    </DashboardLayout>
  );
}

export default CreateProject;