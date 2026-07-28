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

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h2 className="fw-bold">
          {emoji} {greeting}, {user?.name}
        </h2>

        <p className="text-muted mb-0">
          Welcome to the Coordinator Dashboard.
        </p>

      </div>
    </div>
  );
}

export default AdminWelcomeBanner;