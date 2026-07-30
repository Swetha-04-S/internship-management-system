import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} from "../../services/announcementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    expiryDate: "",
  });

  const [message, setMessage] = useState("");

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createAnnouncement(formData);

    if (response.success) {
      setMessage("✅ Announcement created successfully.");

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        expiryDate: "",
      });

      loadAnnouncements();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;

    await deleteAnnouncement(id);

    loadAnnouncements();
  };

  return (
    <DashboardLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Announcements
          </h2>

          <p className="text-muted mb-0">
            Create and manage announcements for students.
          </p>

        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          {announcements.length} Announcement
          {announcements.length !== 1 ? "s" : ""}
        </span>

      </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Title
              </label>

              <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                required
              />
            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Announcement details..."
                required
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Priority
                </label>

                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Expiry Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="text-end">

              <button className="btn btn-primary px-4">
                Publish Announcement
              </button>

            </div>

          </form>

        </div>
      </div>

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Recent Announcements
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

                <div className="d-flex justify-content-between align-items-start flex-wrap">

                  <div>

                    <h5>{announcement.title}</h5>

                    <p className="text-muted mb-2">
                      {announcement.description}
                    </p>

                    <span
                      className={`badge ${
                        announcement.priority === "High"
                          ? "bg-danger"
                          : announcement.priority === "Medium"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {announcement.priority}
                    </span>

                  </div>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      handleDelete(announcement._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Announcements;