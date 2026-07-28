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

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await createAnnouncement(formData);

    if (response.success) {

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

    await deleteAnnouncement(id);

    loadAnnouncements();

  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">
        Announcement Management
      </h2>

      {/* Create Form */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Title</label>

              <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Description</label>

              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

            <div className="row">

              <div className="col-md-6">

                <label>Priority</label>

                <select
                  className="form-control"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

              <div className="col-md-6">

                <label>Expiry Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button className="btn btn-primary mt-4">

              Create Announcement

            </button>

          </form>

        </div>

      </div>

      {/* Announcement List */}

      <div className="card shadow border-0">

        <div className="card-body">

          <h4 className="mb-4">
            Announcements
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

                <div className="d-flex justify-content-between">

                  <div>

                    <h5>
                      {announcement.title}
                    </h5>

                    <p>
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

                  <div>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(announcement._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

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