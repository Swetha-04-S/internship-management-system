const API = "http://localhost:5000/api/tasks";

export const createTask = async (taskData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return await response.json();
};

export const getTasks = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.tasks;
};

export const getProjectTasks = async (projectId) => {
  const response = await fetch(`${API}/project/${projectId}`);
  const data = await response.json();
  return data.tasks;
};