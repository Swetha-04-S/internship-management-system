import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

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

export default AdminLayout;