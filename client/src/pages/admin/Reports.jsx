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
        <h3>Loading reports...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="mb-4">Reports & Analytics</h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h3>{report.students}</h3>
              <p>Total Students</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h3>{report.projects}</h3>
              <p>Projects</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h3>{report.tasks}</h3>
              <p>Tasks</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h3>{report.completion}%</h3>
              <p>Completion</p>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h4>Performance Summary</h4>

          <table className="table mt-4">

            <tbody>

              <tr>
                <td>Reviewed Submissions</td>
                <td>{report.reviewed}</td>
              </tr>

              <tr>
                <td>Pending Reviews</td>
                <td>{report.pending}</td>
              </tr>

              <tr>
                <td>Average Marks</td>
                <td>{report.averageMarks}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reports;