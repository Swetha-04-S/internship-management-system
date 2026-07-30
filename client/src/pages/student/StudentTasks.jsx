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
      (submission) => submission.task && submission.task._id === taskId
    );
  };

  return (
    <StudentLayout>

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

        <div>

          <h2 className="fw-bold mb-1">
            My Tasks
          </h2>

          <p className="text-muted mb-0">
            Track your assigned tasks, submissions and feedback.
          </p>

        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
        </span>

      </div>

      {tasks.length === 0 ? (

        <div className="alert alert-warning shadow-sm">
          <h5>No Tasks Assigned</h5>
          <p className="mb-0">
            Your coordinator hasn't assigned any tasks yet.
          </p>
        </div>

      ) : (

        tasks.map((task) => {
          const submission = getSubmission(task._id);

          return (
            <div
              key={task._id}
              className="card shadow-sm border-0 mb-4"
            >

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center flex-wrap">

                  <div>

                    <h4 className="fw-bold mb-1">
                      {task.title}
                    </h4>

                    <small className="text-muted">
                      Internship Task
                    </small>

                  </div>

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

                <p className="text-muted">
                  {task.description}
                </p>

                <div className="row mb-3">

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 text-center">

                      <h5 className="fw-bold text-primary">
                        {task.maxMarks}
                      </h5>

                      <small className="text-muted">
                        Maximum Marks
                      </small>

                    </div>

                  </div>

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 text-center">

                      <h6 className="fw-bold text-danger">
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </h6>

                      <small className="text-muted">
                        Due Date
                      </small>

                    </div>

                  </div>

                  <div className="col-md-4 mb-3">

                    <div className="border rounded p-3 text-center">

                      <h6 className="fw-bold">
                        {submission
                          ? "Submitted"
                          : "Not Submitted"}
                      </h6>

                      <small className="text-muted">
                        Submission
                      </small>

                    </div>

                  </div>

                </div>

                <hr />

                {!submission ? (

                  <Link
                    to={`/student/submit-work/${task._id}`}
                    className="btn btn-success px-4"
                  >
                    Submit Work
                  </Link>

                ) : (

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <strong>
                        Obtained Marks
                      </strong>

                      <br />

                      <span className="badge bg-success fs-6 mt-2">
                        {submission.marks ?? "-"}
                      </span>

                    </div>

                    <div className="col-md-6 mb-3">

                      <strong>
                        Feedback
                      </strong>

                      <p className="mt-2 mb-0">
                        {submission.feedback ||
                          "Awaiting Review"}
                      </p>

                    </div>

                  </div>

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