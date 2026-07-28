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

  return (
    <StudentLayout>

      <h2 className="mb-4">My Profile</h2>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="text-center mb-4">

            <img
              src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff&size=128"
              alt="Profile"
              className="rounded-circle mb-3"
            />

            <h3>{user?.name}</h3>

            <span className="badge bg-success">
              Student
            </span>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Name</strong>
              <p>{user?.name}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email</strong>
              <p>{user?.email}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Assigned Project</strong>
              <p>{project?.title || "No Project Assigned"}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Internship Progress</strong>
              <p>{progress.progress}%</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Total Tasks</strong>
              <p>{progress.totalTasks}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Reviewed Tasks</strong>
              <p>{progress.reviewedTasks}</p>
            </div>

          </div>

        </div>

      </div>

    </StudentLayout>
  );
}

export default StudentProfile;