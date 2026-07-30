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

  if (project === null) {
    return (
      <StudentLayout>
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          ></div>

          <h5 className="text-muted">
            Loading project...
          </h5>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>

      {/* Header */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          My Project
        </h2>

        <p className="text-muted mb-0">
          View your assigned internship project and important details.
        </p>

      </div>

      {!project ? (

        <div className="alert alert-warning shadow-sm">
          <h5 className="mb-2">
            No Project Assigned
          </h5>

          <p className="mb-0">
            Your coordinator hasn't assigned a project yet.
            Please check back later.
          </p>
        </div>

      ) : (

        <>
          {/* Project Card */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">

                <div>

                  <h3 className="fw-bold mb-1">
                    {project.title}
                  </h3>

                  <p className="text-muted mb-0">
                    Internship Project
                  </p>

                </div>

                <span className="badge bg-primary fs-6 px-3 py-2">
                  Active
                </span>

              </div>

              <hr />

              <p className="text-muted">
                {project.description}
              </p>

            </div>

          </div>

          {/* Project Details */}

          <div className="row">

            <div className="col-lg-4 col-md-6 mb-4">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body text-center">

                  <h5 className="fw-bold text-primary">
                    {project.duration || "-"}
                  </h5>

                  <p className="text-muted mb-0">
                    Duration
                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-6 mb-4">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body text-center">

                  <h5 className="fw-bold text-warning">
                    {project.difficulty || "-"}
                  </h5>

                  <p className="text-muted mb-0">
                    Difficulty
                  </p>

                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-12 mb-4">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body text-center">

                  <h5 className="fw-bold text-danger">
                    {project.deadline
                      ? new Date(
                          project.deadline
                        ).toLocaleDateString()
                      : "-"}
                  </h5>

                  <p className="text-muted mb-0">
                    Deadline
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Tips Card */}

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <h4 className="fw-bold mb-3">
                Project Guidelines
              </h4>

              <ul className="mb-0">

                <li>
                  Complete all assigned tasks before the deadline.
                </li>

                <li>
                  Push your latest code to GitHub regularly.
                </li>

                <li>
                  Test your application before submitting.
                </li>

                <li>
                  Include a working demo link whenever possible.
                </li>

                <li>
                  Review coordinator feedback after each submission.
                </li>

              </ul>

            </div>

          </div>

        </>

      )}

    </StudentLayout>
  );
}

export default StudentProject;