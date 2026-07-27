const API = "http://localhost:5000/api/submissions";

// Student submits work
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

// Coordinator gets all submissions
export const getSubmissions = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.submissions;
};

// Coordinator reviews submission
export const reviewSubmission = async (
  submissionId,
  reviewData
) => {
  const response = await fetch(
    `${API}/${submissionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  return await response.json();
};