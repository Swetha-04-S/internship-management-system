const API = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async () => {

  const response = await fetch(API);

  const data = await response.json();

  return data;

};