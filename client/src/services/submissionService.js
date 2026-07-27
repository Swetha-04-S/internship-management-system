const API = "http://localhost:5000/api/submissions";

export const createSubmission = async (submissionData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionData),
  });

  return await response.json();
};

export const getSubmissions = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.submissions;
};