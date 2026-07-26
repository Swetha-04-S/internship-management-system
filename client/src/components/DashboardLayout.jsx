import Navbar from "./Navbar";
import CoordinatorSidebar from "./CoordinatorSidebar";
import StudentSidebar from "./StudentSidebar";

function DashboardLayout({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="d-flex">

        {user?.role === "admin" ? (
          <CoordinatorSidebar />
        ) : (
          <StudentSidebar />
        )}

        <div
          className="p-4 flex-grow-1"
          style={{
            background: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
}

export default DashboardLayout;