import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getProjects } from "../../services/projectService";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskService";

function CreateTask() {
  const emptyForm = {
    title: "",
    description: "",
    project: "",
    dueDate: "",
    maxMarks: 100,
  };

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
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
    if (error) setError("");
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      project: "",
      dueDate: "",
      maxMarks: 100,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;

    if (editingId) {
      result = await updateTask(editingId, formData);
    } else {
      result = await createTask(formData);
    }

    if (result.success) {
      setMessage(
        editingId
          ? "✅ Task updated successfully."
          : "✅ Task created successfully."
      );

      resetForm();

      loadTasks();
    } else {
      setError(result.message);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);

    setFormData({
      title: task.title,
      description: task.description,
      project: task.project?._id || task.project,
      dueDate: task.dueDate.split("T")[0],
      maxMarks: task.maxMarks,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const result = await deleteTask(id);

    if (result.success) {
      loadTasks();
    }
  };

  return (
    <DashboardLayout>

  {/* Header */}
  <div className="mb-4">
    <h2 className="fw-bold mb-1">
      {editingId ? "Edit Task" : "Create Task"}
    </h2>

    <p className="text-muted mb-0">
      Assign a task to an internship project.
    </p>
  </div>

  <div className="card shadow-sm border-0">

    <div className="card-body p-4">

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

          <label className="form-label fw-semibold">
            Project
          </label>

          <select
            className="form-select"
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Project
            </option>

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

          <label className="form-label fw-semibold">
            Task Title
          </label>

          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Build Login Module"
            value={formData.title}
            onChange={handleChange}
            required
          />

        </div>

        {/* Description */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Description
          </label>

          <textarea
            rows="4"
            className="form-control"
            name="description"
            placeholder="Describe what students need to complete..."
            value={formData.description}
            onChange={handleChange}
            required
          />

        </div>

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
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

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
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

        </div>

        <div className="d-flex justify-content-end mt-3">

          {editingId && (

            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={resetForm}
            >
              Cancel
            </button>

          )}

          <button
            type="submit"
            className="btn btn-primary px-4"
          >
            {editingId ? "Update Task" : "Create Task"}
          </button>

        </div>

      </form>

    </div>

  </div>
        {/* Recent Tasks */}

        <div className="mt-5">
        <h3 className="fw-bold mb-4">Recent Tasks</h3>

        {tasks.length === 0 ? (
          <div className="alert alert-info">
            No tasks found.
          </div>
        ) : (
          <div className="row">

            {tasks.map((task) => (

              <div
                className="col-md-6 col-lg-4 mb-4"
                key={task._id}
              >
                <div className="card shadow-sm h-100 border-0">

                  <div className="card-body">

                    <h5 className="fw-bold">
                      {task.title}
                    </h5>

                    <p className="text-muted mb-2">
                      {task.description}
                    </p>

                    <p className="mb-1">
                      <strong>Project:</strong>{" "}
                      {task.project?.title || "N/A"}
                    </p>

                    <p className="mb-1">
                      <strong>Marks:</strong>{" "}
                      {task.maxMarks}
                    </p>

                    <p className="mb-3">
                      <strong>Due:</strong>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>

                    <div className="d-flex justify-content-end">

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              </div>

            ))}

          </div>
        )}
      </div>

    </DashboardLayout>
  );
}

export default CreateTask;