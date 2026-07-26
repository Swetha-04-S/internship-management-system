const API = "http://localhost:5000/api/students";

export const getStudents = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.students;
};

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

export const getMyProject = async (studentId) => {
  const response = await fetch(
    `${API}/my-project/${studentId}`
  );

  const data = await response.json();

  return data.project;
};