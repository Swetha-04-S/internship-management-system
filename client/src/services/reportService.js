const API = "http://localhost:5000/api/reports";

export const getReports = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
};