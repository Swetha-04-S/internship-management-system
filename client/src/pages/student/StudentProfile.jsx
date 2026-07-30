import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { getMyProject } from "../../services/studentService";
import { getProgress } from "../../services/progressService";

function StudentProfile() {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  const [progress, setProgress] = useState({
    progress: 0,
    totalTasks: 0,
    reviewedTasks: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      setUser(currentUser);

      const projectData = await getMyProject(currentUser.id);
      setProject(projectData);

      const progressData = await getProgress(currentUser.id);
      setProgress(progressData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <StudentLayout>
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          ></div>

          <h5 className="text-muted">
            Loading profile...
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
          My Profile
        </h2>

        <p className="text-muted mb-0">
          View your internship details and progress.
        </p>

      </div>

      {/* Profile Card */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body text-center py-4">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=0D6EFD&color=fff&size=120`}
            alt="Profile"
            className="rounded-circle mb-3"
          />

          <h3 className="fw-bold mb-1">
            {user.name}
          </h3>

          <p className="text-muted mb-2">
            {user.email}
          </p>

          <span className="badge bg-success px-3 py-2">
            Student
          </span>

        </div>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-lg-4 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-primary">
                {progress.totalTasks}
              </h2>

              <p className="text-muted mb-0">
                Total Tasks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-4 col-md-6 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-success">
                {progress.reviewedTasks}
              </h2>

              <p className="text-muted mb-0">
                Reviewed Tasks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-4 col-md-12 mb-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h2 className="fw-bold text-danger">
                {progress.progress}%
              </h2>

              <p className="text-muted">
                Overall Progress
              </p>

              <div
                className="progress"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progress.progress}%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Internship Details */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Internship Details
          </h4>

          <div className="row">

            <div className="col-md-6 mb-3">

              <h6 className="text-muted">
                Student Name
              </h6>

              <p className="fw-semibold">
                {user.name}
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h6 className="text-muted">
                Email Address
              </h6>

              <p className="fw-semibold">
                {user.email}
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h6 className="text-muted">
                Assigned Project
              </h6>

              <p className="fw-semibold">
                {project?.title || "No Project Assigned"}
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h6 className="text-muted">
                Internship Progress
              </h6>

              <p className="fw-semibold">
                {progress.progress}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </StudentLayout>
  );
}

export default StudentProfile;