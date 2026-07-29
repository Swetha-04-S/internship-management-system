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

  const getPriority = (priority) => {
    switch (priority) {
      case "High":
        return {
          bg: "#FEE2E2",
          color: "#DC2626",
          icon: "bi-exclamation-circle-fill",
        };

      case "Medium":
        return {
          bg: "#FEF3C7",
          color: "#D97706",
          icon: "bi-exclamation-triangle-fill",
        };

      default:
        return {
          bg: "#DCFCE7",
          color: "#16A34A",
          icon: "bi-megaphone-fill",
        };
    }
  };

  return (
    <div
      className="dashboard-card"
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
      }}
    >
      <div className="d-flex align-items-center mb-4">

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: "#DBEAFE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="bi bi-megaphone-fill"
            style={{
              color: "#2563EB",
              fontSize: "24px",
            }}
          ></i>
        </div>

        <div className="ms-3">
          <h4 className="fw-bold mb-1">
            Announcements
          </h4>

          <small className="text-muted">
            Latest notices from your coordinator
          </small>
        </div>

      </div>

      {announcements.length === 0 ? (
        <div className="alert alert-info mb-0">
          No announcements available.
        </div>
      ) : (
        announcements.map((announcement) => {
          const priority = getPriority(
            announcement.priority
          );

          return (
            <div
              key={announcement._id}
              className="mb-3"
              style={{
                borderLeft: `5px solid ${priority.color}`,
                background: "#F8FAFC",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">

                <div className="d-flex">

                  <i
                    className={`bi ${priority.icon} me-3`}
                    style={{
                      color: priority.color,
                      fontSize: "22px",
                    }}
                  ></i>

                  <div>

                    <h5 className="fw-bold mb-2">
                      {announcement.title}
                    </h5>

                    <p className="text-muted mb-2">
                      {announcement.description}
                    </p>

                    {announcement.expiryDate && (
                      <small className="text-secondary">
                        Expires on{" "}
                        {new Date(
                          announcement.expiryDate
                        ).toLocaleDateString()}
                      </small>
                    )}

                  </div>

                </div>

                <span
                  className="badge"
                  style={{
                    background: priority.bg,
                    color: priority.color,
                  }}
                >
                  {announcement.priority}
                </span>

              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Announcements;