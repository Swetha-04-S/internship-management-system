const API = "http://localhost:5000/api/students";

// Get all students
export const getStudents = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.students;
};

// Assign project to student
export const assignProject = async (studentId, projectId) => {
  const response = await fetch(`${API}/assign-project`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId,
      projectId,
    }),
  });

  return await response.json();
};

// Get assigned project of a student
export const getMyProject = async (studentId) => {
  const response = await fetch(
    `${API}/my-project/${studentId}`
  );

  const data = await response.json();

  return data.project;
};