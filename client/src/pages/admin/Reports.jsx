import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getReports } from "../../services/reportService";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getReports();
      setReport(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!report) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          ></div>

          <h5 className="text-muted">
            Loading analytics...
          </h5>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

        <div>

          <h2 className="fw-bold mb-1">
            Reports & Analytics
          </h2>

          <p className="text-muted mb-0">
            Overview of internship performance and
            progress.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h1 className="fw-bold text-primary">
                {report.students}
              </h1>

              <p className="text-muted mb-0">
                Total Students
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h1 className="fw-bold text-success">
                {report.projects}
              </h1>

              <p className="text-muted mb-0">
                Projects
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h1 className="fw-bold text-warning">
                {report.tasks}
              </h1>

              <p className="text-muted mb-0">
                Tasks
              </p>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              <h1 className="fw-bold text-danger">
                {report.completion}%
              </h1>

              <p className="text-muted mb-2">
                Completion Rate
              </p>

              <div
                className="progress"
                style={{ height: "8px" }}
              >

                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${report.completion}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Performance Summary */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Performance Summary
          </h4>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead className="table-light">

                <tr>
                  <th>Metric</th>
                  <th className="text-end">
                    Value
                  </th>
                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>
                    Reviewed Submissions
                  </td>

                  <td className="text-end">
                    <span className="badge bg-success">
                      {report.reviewed}
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Pending Reviews</td>

                  <td className="text-end">
                    <span className="badge bg-warning text-dark">
                      {report.pending}
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>Average Marks</td>

                  <td className="text-end">
                    <span className="badge bg-primary">
                      {report.averageMarks}
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reports;