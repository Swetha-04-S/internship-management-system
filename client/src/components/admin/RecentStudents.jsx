import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";

function RecentStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="dashboard-card mb-4"
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
      }}
    >
      <div className="d-flex align-items-center mb-4">
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: "#DCFCE7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="bi bi-people-fill"
            style={{ color: "#16A34A", fontSize: "24px" }}
          ></i>
        </div>

        <div className="ms-3">
          <h4 className="fw-bold mb-1">Recent Students</h4>
          <small className="text-muted">
            Newly registered students
          </small>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-person-x"
            style={{ fontSize: "48px", color: "#CBD5E1" }}
          ></i>

          <h6 className="mt-3">No students found</h6>

          <p className="text-muted mb-0">
            Registered students will appear here.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="fw-semibold">{student.name}</td>

                  <td>{student.email}</td>

                  <td>
                    <span className="badge bg-success">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentStudents;