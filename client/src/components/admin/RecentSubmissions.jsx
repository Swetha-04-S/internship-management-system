import { useEffect, useState } from "react";
import { getSubmissions } from "../../services/submissionService";

function RecentSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data.slice(0, 5));
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
            background: "#DBEAFE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="bi bi-file-earmark-check-fill"
            style={{ color: "#2563EB", fontSize: "24px" }}
          ></i>
        </div>

        <div className="ms-3">
          <h4 className="fw-bold mb-1">Recent Submissions</h4>
          <small className="text-muted">
            Latest student work submitted
          </small>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-inbox"
            style={{ fontSize: "48px", color: "#CBD5E1" }}
          ></i>
          <h6 className="mt-3">No submissions yet</h6>
          <p className="text-muted mb-0">
            Student submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Student</th>
                <th>Task</th>
                <th>Status</th>
                <th>Marks</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td className="fw-semibold">
                    {submission.student?.name}
                  </td>

                  <td>{submission.task?.title}</td>

                  <td>
                    <span
                      className={`badge ${
                        submission.status === "Reviewed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>

                  <td>
                    <strong>{submission.marks ?? "-"}</strong>
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

export default RecentSubmissions;