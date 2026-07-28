const API = "http://localhost:5000/api/progress";

export const getProgress = async (studentId) => {
  const response = await fetch(`${API}/${studentId}`);
  const data = await response.json();
  return data;
};