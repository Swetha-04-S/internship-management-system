const API = "http://localhost:5000/api/announcements";

export const getAnnouncements = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.announcements;
};

export const createAnnouncement = async (announcement) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcement),
  });

  return await response.json();
};

export const deleteAnnouncement = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};