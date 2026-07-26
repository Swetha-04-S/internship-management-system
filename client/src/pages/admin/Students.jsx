import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getStudents, assignProject } from "../../services/studentService";
import { getProjects } from "../../services/projectService";

function Students() {
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const studentData = await getStudents();
    const projectData = await getProjects();

    setStudents(studentData);
    setProjects(projectData);
  };

  const handleAssign = async (studentId) => {
    const projectId = selectedProjects[studentId];

    if (!projectId) {
      alert("Please select a project.");
      return;
    }

    const result = await assignProject(studentId, projectId);

    alert(result.message);

    loadData();
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">Manage Students</h2>

      <table className="table table-bordered shadow">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Assign Project</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student._id}>

              <td>{student.name}</td>

              <td>{student.email}</td>

              <td>

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

              </td>

              <td>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAssign(student._id)}
                >
                  Assign
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Students;