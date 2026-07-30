import { useEffect, useState } from "react";

function AdminWelcomeBanner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let emoji = "🌙";

  if (hour < 12) {
    greeting = "Good Morning";
    emoji = "🌅";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="mb-4"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #2563EB 100%)",
        borderRadius: "20px",
        padding: "35px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          right: "-60px",
          top: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.10)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "60px",
          bottom: "-40px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 className="fw-bold mb-2">
          {emoji} {greeting}, {user?.name}
        </h2>

        <p
          className="mb-4"
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "17px",
          }}
        >
          Welcome back! Monitor student progress, manage projects and keep your
          internship programme running smoothly.
        </p>

        <div className="d-flex flex-wrap gap-2">

          <span className="badge bg-light text-primary px-3 py-2">
            👨‍🎓 Student Management
          </span>

          <span className="badge bg-light text-success px-3 py-2">
            📁 Project Tracking
          </span>

          <span className="badge bg-light text-dark px-3 py-2">
            📊 Dashboard Analytics
          </span>

          <span className="badge bg-light text-secondary px-3 py-2">
            📅 {today}
          </span>

        </div>
      </div>
    </div>
  );
}

export default AdminWelcomeBanner;