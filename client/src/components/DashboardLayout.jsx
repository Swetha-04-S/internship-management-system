import Navbar from "./Navbar";
import CoordinatorSidebar from "./CoordinatorSidebar";
import StudentSidebar from "./StudentSidebar";

function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F1F5F9",
      }}
    >
      <Navbar />

      <div className="d-flex">

        {user?.role === "admin" ? (
          <CoordinatorSidebar />
        ) : (
          <StudentSidebar />
        )}

        <main
          className="flex-grow-1 p-4"
          style={{
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              minHeight: "calc(100vh - 110px)",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(15,23,42,.08)",
            }}
          >
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;