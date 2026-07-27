import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/DashboardLayout";
import { getMyProject } from "../../services/studentService";
import { getProjectTasks } from "../../services/taskService";

function StudentDashboard() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const projectData = await getMyProject(user.id);

      setProject(projectData);

      if (projectData) {
        const taskData = await getProjectTasks(projectData._id);
        setTasks(taskData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">My Internship</h2>

        {!project ? (
          <div className="alert alert-warning">
            No Project Assigned Yet
          </div>
        ) : (
          <>
            <div className="card shadow border-0 mb-4">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">
                  <h3>{project.title}</h3>

                  <span className="badge bg-success fs-6">
                    In Progress
                  </span>
                </div>

                <hr />

                <p>{project.description}</p>

                <div className="row">
                  <div className="col-md-4">
                    <strong>Duration</strong><br />
                    {project.duration}
                  </div>

                  <div className="col-md-4">
                    <strong>Difficulty</strong><br />
                    {project.difficulty}
                  </div>

                  <div className="col-md-4">
                    <strong>Deadline</strong><br />
                    {new Date(project.deadline).toLocaleDateString()}
                  </div>
                </div>

              </div>
            </div>

            <div className="card shadow border-0">

              <div className="card-body">

                <h4 className="mb-4">
                  My Tasks
                </h4>

                {tasks.length === 0 ? (
                  <div className="alert alert-info">
                    No Tasks Assigned
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task._id}
                      className="border rounded p-3 mb-3"
                    >
                      <div className="d-flex justify-content-between">

                        <h5>{task.title}</h5>

                        <span className="badge bg-warning text-dark">
                          {task.status}
                        </span>

                      </div>

                      <p>{task.description}</p>

                      <div className="row mb-3">

                        <div className="col-md-4">
                          <strong>Marks</strong><br />
                          {task.maxMarks}
                        </div>

                        <div className="col-md-4">
                          <strong>Due Date</strong><br />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>

                      </div>

                      <Link
                        to={`/student/submit-work/${task._id}`}
                        className="btn btn-success"
                      >
                        Submit Work
                      </Link>

                    </div>
                  ))
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;