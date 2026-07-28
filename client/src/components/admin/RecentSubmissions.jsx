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

      // Show only the latest 5 submissions
      setSubmissions(data.slice(0, 5));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card shadow border-0 mb-4">

      <div className="card-body">

        <h4 className="mb-4">
          📄 Recent Submissions
        </h4>

        {submissions.length === 0 ? (

          <div className="alert alert-info">
            No submissions found.
          </div>

        ) : (

          <table className="table table-hover align-middle">

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

                  <td>{submission.student?.name}</td>

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

                  <td>{submission.marks}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default RecentSubmissions;