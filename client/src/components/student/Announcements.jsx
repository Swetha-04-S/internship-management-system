import { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h4 className="mb-4">
          📢 Announcements
        </h4>

        {announcements.length === 0 ? (

          <div className="alert alert-info">
            No announcements available.
          </div>

        ) : (

          announcements.map((announcement) => (

            <div
              key={announcement._id}
              className="border rounded p-3 mb-3"
            >

              <div className="d-flex justify-content-between align-items-center">

                <h5>{announcement.title}</h5>

                <span
                  className={`badge ${getBadgeColor(
                    announcement.priority
                  )}`}
                >
                  {announcement.priority}
                </span>

              </div>

              <p className="mb-2">
                {announcement.description}
              </p>

              {announcement.expiryDate && (
                <small className="text-muted">
                  Expires:{" "}
                  {new Date(
                    announcement.expiryDate
                  ).toLocaleDateString()}
                </small>
              )}

            </div>

          ))

        )}

      </div>
    </div>
  );
}

export default Announcements;