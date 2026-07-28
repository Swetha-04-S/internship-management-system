import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { getMyProject } from "../../services/studentService";

function StudentProject() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await getMyProject(user.id);

      setProject(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StudentLayout>

      <h2 className="mb-4">My Project</h2>

      {!project ? (
        <div className="alert alert-warning">
          No Project Assigned Yet
        </div>
      ) : (
        <div className="card shadow border-0">

          <div className="card-body">

            <h3>{project.title}</h3>

            <hr />

            <p>{project.description}</p>

            <div className="row">

              <div className="col-md-4 mb-3">
                <strong>Duration</strong>
                <br />
                {project.duration}
              </div>

              <div className="col-md-4 mb-3">
                <strong>Difficulty</strong>
                <br />
                {project.difficulty}
              </div>

              <div className="col-md-4 mb-3">
                <strong>Deadline</strong>
                <br />
                {new Date(project.deadline).toLocaleDateString()}
              </div>

            </div>

          </div>

        </div>
      )}

    </StudentLayout>
  );
}

export default StudentProject;