import { useEffect, useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";

import WelcomeBanner from "../../components/student/WelcomeBanner";
import DashboardStats from "../../components/student/DashboardStats";
import UpcomingDeadline from "../../components/student/UpcomingDeadline";
import InternshipJourney from "../../components/student/InternshipJourney";
import RecentActivity from "../../components/student/RecentActivity";
import Announcements from "../../components/student/Announcements";

import { getMyProject } from "../../services/studentService";
import { getProjectTasks } from "../../services/taskService";
import { getStudentSubmissions } from "../../services/submissionService";
import { getProgress } from "../../services/progressService";

function StudentDashboard() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [progress, setProgress] = useState({
    progress: 0,
    reviewedTasks: 0,
    totalTasks: 0,
  });

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

      const submissionData = await getStudentSubmissions(user.id);
      setSubmissions(submissionData || []);

      const progressData = await getProgress(user.id);
      setProgress(progressData);

    } catch (error) {
      console.error(error);
    }
  };

  const averageMarks =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (total, submission) =>
              total + (submission.marks || 0),
            0
          ) / submissions.length
        )
      : 0;

  return (
    <StudentLayout>

      <div className="container-fluid">

        <WelcomeBanner />

        <DashboardStats
          project={project}
          progress={progress}
          averageMarks={averageMarks}
        />

        <UpcomingDeadline
          tasks={tasks}
        />

        <InternshipJourney
          project={project}
          tasks={tasks}
          submissions={submissions}
          progress={progress}
        />

        <RecentActivity
          submissions={submissions}
        />

        <Announcements />

      </div>

    </StudentLayout>
  );
}

export default StudentDashboard;