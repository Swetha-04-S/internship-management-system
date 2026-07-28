import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getProjects } from "../../services/projectService";
import { createTask } from "../../services/taskService";

function CreateTask() {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: "",
    maxMarks: 100,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const result = await createTask(formData);

    if (result.success) {
      setMessage("✅ Task Created Successfully");

      setFormData({
        title: "",
        description: "",
        project: "",
        dueDate: "",
        maxMarks: 100,
      });

    } else {
      setError(result.message);
    }
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">Create Task</h2>

      <div className="card shadow border-0">
        <div className="card-body">

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

            {/* Project */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                Project
              </label>

              <select
                className="form-select"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.title}
                  </option>
                ))}

              </select>
            </div>

            {/* Task Title */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                Task Title
              </label>

              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                Description
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="description"
                placeholder="Describe the task..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Maximum Marks */}
            <div className="mb-3">
              <label className="form-label fw-bold">
                Maximum Marks
              </label>

              <input
                type="number"
                className="form-control"
                name="maxMarks"
                value={formData.maxMarks}
                onChange={handleChange}
                required
              />
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                Due Date
              </label>

              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4"
            >
              Create Task
            </button>

          </form>

        </div>
      </div>

    </DashboardLayout>
  );
}

export default CreateTask;