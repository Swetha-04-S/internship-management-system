import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";

function StudentLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <StudentSidebar />

        <div
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
}

export default StudentLayout;