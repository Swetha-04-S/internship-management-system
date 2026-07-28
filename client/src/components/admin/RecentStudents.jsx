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

      // Show only latest 5 students
      setStudents(data.slice(0, 5));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card shadow border-0 mb-4">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4>👨‍🎓 Recent Students</h4>

        </div>

        {students.length === 0 ? (

          <div className="alert alert-info">
            No students found.
          </div>

        ) : (

          <table className="table table-hover">

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

                  <td>{student.name}</td>

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

        )}

      </div>

    </div>
  );
}

export default RecentStudents;