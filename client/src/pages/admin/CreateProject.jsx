
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../../services/projectService";

function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    deadline: "",
    difficulty: "Beginner",
  });

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let data;
  
    if (editingId) {
      data = await updateProject(editingId, formData);
    } else {
      data = await createProject(formData);
    }
  
    if (data.success) {
      setMessage(
        editingId
          ? "✅ Project updated successfully!"
          : "🎉 Project created successfully!"
      );
  
      setFormData({
        title: "",
        description: "",
        duration: "",
        deadline: "",
        difficulty: "Beginner",
      });
  
      setEditingId(null);
      loadProjects();
    } else {
      setMessage("❌ Failed.");
    }
  };
  const handleEdit = (project) => {
    setEditingId(project._id);
  
    setFormData({
      title: project.title,
      description: project.description,
      duration: project.duration,
      deadline: project.deadline.split("T")[0],
      difficulty: project.difficulty,
    });
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
  
    if (!confirmDelete) return;
  
    const data = await deleteProject(id);
  
    if (data.success) {
      loadProjects();
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h2 className="fw-bold mb-1">Create Project</h2>
          <p className="text-muted mb-0">
            Add a new internship project for students.
          </p>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">

          {message && (
            <div
              className={`alert ${
                message.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Project Title
              </label>

              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="AI Resume Analyzer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                rows="4"
                className="form-control"
                name="description"
                placeholder="Describe the internship project..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Duration</label>
                <input
                  className="form-control"
                  name="duration"
                  placeholder="6 Weeks"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Difficulty</label>
                <select
                  className="form-select"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

            </div>

            <div className="d-flex justify-content-end mt-3">
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setEditingId(null);

                    setFormData({
                      title: "",
                      description: "",
                      duration: "",
                      deadline: "",
                      difficulty: "Beginner",
                    });
                   }}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                {editingId ? "Update Project" : "Create Project"}
              </button>

            </div>

          </form> 
        </div>
      </div>

      <div className="card shadow-sm border-0 mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Recent Projects</h4>
            <span className="badge bg-primary">
              {projects.length} Project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="alert alert-info mb-0">
              No projects created yet.
            </div>
          ) : (
            <div className="row">
              {projects.map((project) => (
                <div className="col-lg-6 mb-4" key={project._id}>
                  <div className="card border shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="fw-bold">{project.title}</h5>

                      <span
                        className={`badge ${
                          project.difficulty === "Advanced"
                            ? "bg-danger"
                            : project.difficulty === "Intermediate"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {project.difficulty}
                      </span>

                      <hr />

                      <p className="text-muted">
                        {project.description}
                      </p>

                      <div className="row text-center">
                        <div className="col-6">
                          <small className="text-muted">Duration</small>
                          <h6 className="mt-2">{project.duration}</h6>
                        </div>

                        <div className="col-6">
                          <small className="text-muted">Deadline</small>
                          <h6 className="mt-2">
                            {new Date(project.deadline).toLocaleDateString()}
                          </h6>
                        </div>
                      </div>
                      <hr />

                      <div className="d-flex justify-content-end gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(project)}
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(project._id)}
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

    </DashboardLayout>
  );
}

export default CreateProject;
