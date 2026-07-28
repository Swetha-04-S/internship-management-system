import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StudentLayout from "../../layouts/StudentLayout";
import { getMyProject } from "../../services/studentService";
import { getProjectTasks } from "../../services/taskService";
import { getStudentSubmissions } from "../../services/submissionService";

function StudentTasks() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const project = await getMyProject(user.id);

      if (project) {
        const taskData = await getProjectTasks(project._id);
        setTasks(taskData);
      }

      const submissionData = await getStudentSubmissions(user.id);
      setSubmissions(submissionData);

    } catch (error) {
      console.error(error);
    }
  };

  const getSubmission = (taskId) => {
    return submissions.find(
      (submission) => submission.task._id === taskId
    );
  };

  return (
    <StudentLayout>

      <h2 className="mb-4">My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="alert alert-warning">
          No Tasks Assigned
        </div>
      ) : (
        tasks.map((task) => {
          const submission = getSubmission(task._id);

          return (
            <div
              key={task._id}
              className="card shadow border-0 mb-4"
            >
              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <h4>{task.title}</h4>

                  <span
                    className={`badge ${
                      submission
                        ? submission.status === "Reviewed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {submission
                      ? submission.status
                      : "Pending"}
                  </span>

                </div>

                <hr />

                <p>{task.description}</p>

                <div className="row">

                  <div className="col-md-4">
                    <strong>Maximum Marks</strong>
                    <br />
                    {task.maxMarks}
                  </div>

                  <div className="col-md-4">
                    <strong>Due Date</strong>
                    <br />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>

                </div>

                <hr />

                {!submission ? (

                  <Link
                    to={`/student/submit-work/${task._id}`}
                    className="btn btn-success"
                  >
                    Submit Work
                  </Link>

                ) : (

                  <>
                    <p>
                      <strong>Obtained Marks:</strong>{" "}
                      {submission.marks}
                    </p>

                    <p>
                      <strong>Feedback:</strong>{" "}
                      {submission.feedback || "Awaiting Review"}
                    </p>
                  </>

                )}

              </div>
            </div>
          );
        })
      )}

    </StudentLayout>
  );
}

export default StudentTasks;