const API = "http://localhost:5000/api/projects";

export const createProject = async (projectData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  return await response.json();
};

export const getProjects = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.projects;
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};