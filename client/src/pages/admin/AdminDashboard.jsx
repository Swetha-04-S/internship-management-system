import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import AdminWelcomeBanner from "../../components/admin/AdminWelcomeBanner";
import AdminStats from "../../components/admin/AdminStats";

import { getDashboardStats } from "../../services/dashboardService";
import QuickActions from "../../components/admin/QuickActions";
import RecentSubmissions from "../../components/admin/RecentSubmissions";
import RecentStudents from "../../components/admin/RecentStudents";
import SystemOverview from "../../components/admin/SystemOverview";

function AdminDashboard() {

  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    tasks: 0,
    pendingReviews: 0,
    reviewed: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="container-fluid">

        <AdminWelcomeBanner />

        <AdminStats stats={stats} />
        <QuickActions />
        <RecentSubmissions />
        <RecentStudents />
        <SystemOverview
            stats={stats}
        />

      </div>

    </DashboardLayout>
    
  );
}

export default AdminDashboard;