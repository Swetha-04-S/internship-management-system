import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getStudents, assignProject } from "../../services/studentService";
import { getProjects } from "../../services/projectService";

function Students() {
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState({});
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentData = await getStudents();
      const projectData = await getProjects();

      setStudents(studentData || []);
      setProjects(projectData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    }
  };

  const handleAssign = async (studentId) => {
    const projectId = selectedProjects[studentId];

    if (!projectId) {
      setError("Please select a project.");
      setMessage("");
      return;
    }

    const result = await assignProject(studentId, projectId);

    if (result.success) {
      setMessage("Project assigned successfully.");
      setError("");

      setSelectedProjects({
        ...selectedProjects,
        [studentId]: "",
      });

      loadData();
    } else {
      setError(result.message);
      setMessage("");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Students
          </h2>

          <p className="text-muted mb-0">
            Assign internship projects to students
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          {filteredStudents.length} Students
        </span>

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

      {/* Search */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Student Cards */}

      <div className="row">
      {filteredStudents.length === 0 ? (

<div className="col-12">

  <div className="alert alert-info text-center">
    No students found.
  </div>

</div>

) : (

filteredStudents.map((student) => (

  <div
    className="col-md-6 col-lg-4 mb-4"
    key={student._id}
  >

    <div className="card border-0 shadow-sm h-100">

      <div className="card-body d-flex flex-column">

        {/* Avatar */}

        <div className="text-center mb-3">

          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "70px",
              height: "70px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {student.name.charAt(0).toUpperCase()}
          </div>

        </div>

        {/* Student Name */}

        <h5 className="fw-bold text-center mb-1">
          {student.name}
        </h5>

        <p className="text-muted text-center mb-3">
          {student.email}
        </p>

        {/* Status */}

        <div className="text-center mb-3">

          {student.assignedProject ? (

            <span className="badge bg-success px-3 py-2">
              Assigned
            </span>

          ) : (

            <span className="badge bg-warning text-dark px-3 py-2">
              Pending
            </span>

          )}

        </div>

        {/* Current Project */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Current Project
          </label>

          <div className="form-control bg-light">

            {student.assignedProject
              ? student.assignedProject.title
              : "Not Assigned"}

          </div>

        </div>

        {/* Select Project */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Assign New Project
          </label>

          <select
            className="form-select"
            value={selectedProjects[student._id] || ""}
            onChange={(e) =>
              setSelectedProjects({
                ...selectedProjects,
                [student._id]: e.target.value,
              })
            }
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

        <button
          className="btn btn-primary w-100 mt-auto"
          onClick={() => handleAssign(student._id)}
        >
          {student.assignedProject
            ? "Change Project"
            : "Assign Project"}
        </button>

      </div>

    </div>

  </div>

))

)}
      </div>

</DashboardLayout>
);
}

export default Students;